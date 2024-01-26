// series-helper.ts

import * as xlsx from 'xlsx';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { TrafficQuestion, TrafficQuiz } from './series.dto';

export function getSeriesFilePath(type: string, number: string): string {
    return path.join('public/resources/series', type, `series-${number}.xlsx`);
}

export function readWorkbook(seriesFilePath: string): any[] {
    try {
        const workbook = xlsx.readFile(seriesFilePath);
        const sheetName = workbook.SheetNames[0];
        return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } catch (error) {
        console.error('Error reading series.xlsx:', error);
        throw new NotFoundException('Series data not found');
    }
}

export function transformSheetData(data: any[]): TrafficQuiz[] {
    return data.map(row => ({
        questions: createQuestions(row, extractCorrections(row)),
    }));
}

export function createQuestions(row: any, corrections: number[]): TrafficQuestion[] {
    if (row['Question 2']) {
        return [
            createQuestion(row, 'Question 1', [row['Reponse 1'], row['Reponse 2']], corrections.slice(0, 1)),
            createQuestion(row, 'Question 2', [row['Reponse 2.1'], row['Reponse 2.2']], corrections.slice(1).map(v => v - 2))
        ];
    } else {
        const responses = Object.entries(row)
            .filter(([key, value]) => typeof key === 'string' && key.startsWith('Reponse'))
            .map(([, value]) => value as string);
        return [createQuestion(row, 'Question 1', responses, corrections)];
    }
}

export function createQuestion(row: any, questionKey: string, responses: string[], corrections: number[]): TrafficQuestion {
    return {
        question: row[questionKey],
        responses,
        correction: corrections,
    };
}

export function extractCorrections(row: any): number[] {
    const correctionString = row['Correction'] as string;
    const corrections = typeof correctionString === 'string'
        ? correctionString.split(',').map(Number)
        : [Number(correctionString)];

    return corrections.map(v => v - 1);
}