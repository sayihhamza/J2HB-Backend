import { Injectable, NotFoundException } from '@nestjs/common';
import { TrafficQuiz, TrafficQuestion } from './series.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class SeriesService {
  private seriesFilePath: string;

  getAvailableTypes(): string[] {
    const seriesPath = 'public/resources/series';
    return fs.readdirSync(seriesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  getNumberOfSeriesForType(type: string): number {
    const seriesPath = path.join('public/resources/series', type);
    const seriesFiles = fs.readdirSync(seriesPath);
    return seriesFiles.length;
  }

  private getFilePath(type: string, number: string): string {
    return `public/resources/series/${type}/series-${number}.xlsx`;
  }

  getSeries(type: string, number: string): TrafficQuiz[] {
    this.seriesFilePath = this.getFilePath(type, number);

    try {
      const workbook = xlsx.readFile(this.seriesFilePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      return this.transformSheetData(sheetData);;
    } catch (error) {
      console.error('Error reading series.xlsx:', error);
      throw new NotFoundException('Series data not found');
    }
  }

  private transformSheetData(data: any[]): TrafficQuiz[] {
    return data.map(row => this.transformRow(row));
  }

  private transformRow(row: any): TrafficQuiz {
    const corrections = this.extractCorrections(row);
    const questions = this.createQuestions(row, corrections);

    return {
      questions,
    };
  }

  private extractCorrections(row: any): number[] {
    const correctionString = row['Correction'] as string;
    let corrections: number[];

    if (typeof row['Correction'] === 'string') {
      corrections = correctionString.split(',').map((Number));
    } else {
      corrections = [Number(correctionString)];
    }

    return corrections.map(v => v - 1);
  }

  private createQuestions(row: any, corrections: number[]): TrafficQuestion[] {
    const questions: TrafficQuestion[] = [];

    if (row['Question 2']) {
      questions.push(
        this.createQuestion(row, 'Question 1', [row['Reponse 1'], row['Reponse 2']], corrections.slice(0, 1)),
        this.createQuestion(row, 'Question 2', [row['Reponse 2.1'], row['Reponse 2.2']], corrections.slice(1).map(v => v - 2))
      );
    } else {
      const responses = Object.entries(row)
        .filter(([key, value]) => typeof key === 'string' && key.startsWith('Reponse'))
        .map(([, value]) => value as string);
      questions.push(this.createQuestion(row, 'Question 1', responses, corrections));
    }

    return questions;
  }

  private createQuestion(row: any, questionKey: string, responses: string[], corrections: number[]): TrafficQuestion {
    return {
      question: row[questionKey],
      responses,
      correction: corrections,
    };
  }
}