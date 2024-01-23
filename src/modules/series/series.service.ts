import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { TrafficQuiz, TrafficQuestion } from './series.dto';

@Injectable()
export class SeriesService {
  getSeries(): TrafficQuiz[] {
    try {
      const series = xlsx.readFile('public/resources/series.xlsx');
      const sheetData = xlsx.utils.sheet_to_json(series.Sheets[series.SheetNames[0]]);
      const mappedData = this.transformData(sheetData);
      return mappedData;
    } catch (error) {
      console.error('Error reading series.xlsx:', error);
      throw new NotFoundException('Series data not found');
    }
  }

  private transformData(data: any[]): TrafficQuiz[] {
    return data.map(row => this.transformRow(row));
  }

  private transformRow(row: any): TrafficQuiz {
    const trafficCorrections = this.extractCorrections(row);
    const trafficQuestions = this.createTrafficQuestions(row, trafficCorrections);

    return {
      questions: trafficQuestions,
    };
  }

  private extractCorrections(row: any): number[] {
    let trafficCorrections: number[] = [];
    if (typeof row['Correction'] === 'string') {
      trafficCorrections = row['Correction'].split(',').map(Number);
    } else {
      trafficCorrections.push(row['Correction']);
    }
    return trafficCorrections.map(n => n - 1);
  }

  private createTrafficQuestions(row: any, trafficCorrections: number[]): TrafficQuestion[] {
    const trafficQuestions: TrafficQuestion[] = [];
    const firstQuestion: TrafficQuestion = {
      question: row['Question 1'],
      responses: [],
      correction: [],
    };

    trafficQuestions.push(firstQuestion);

    if (Object.keys(row).includes('Question 2')) {
      this.addSecondQuestion(row, firstQuestion, trafficCorrections, trafficQuestions);
    } else {
      this.addResponsesAndCorrections(row, firstQuestion, trafficCorrections);
    }

    return trafficQuestions;
  }

  private addSecondQuestion(row: any, firstQuestion: TrafficQuestion, trafficCorrections: number[], trafficQuestions: TrafficQuestion[]): void {
    const secondQuestion: TrafficQuestion = {
      question: row['Question 2'],
      responses: [],
      correction: [],
    };

    firstQuestion.responses.push(row['Reponse 1']);
    firstQuestion.responses.push(row['Reponse 2']);
    secondQuestion.responses.push(row['Reponse 2.1']);
    secondQuestion.responses.push(row['Reponse 2.2']);

    firstQuestion.correction = trafficCorrections.filter(n => n < 2);
    secondQuestion.correction = trafficCorrections.filter(n => n >= 2).map(n => n - 2);

    trafficQuestions.push(secondQuestion);
  }

  private addResponsesAndCorrections(row: any, question: TrafficQuestion, trafficCorrections: number[]): void {
    Object.keys(row)
      .filter(k => k.includes('Reponse'))
      .map(r => question.responses.push(row[r]));

    question.correction = trafficCorrections;
  }
}