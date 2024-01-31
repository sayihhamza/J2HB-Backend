import * as xlsx from 'xlsx';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { TrafficQuestion, TrafficQuiz } from './series.dto';

export function getSeriesFilePath(type: string, number: string): string {
    return path.join('public/resources/series', type, `series-${number}.xlsx`);
}

export function readWorkbook(seriesFilePath: string): any[] {
    try {
        const sheetName = xlsx.readFile(seriesFilePath).SheetNames[0];
        return xlsx.utils.sheet_to_json(xlsx.readFile(seriesFilePath).Sheets[sheetName]);
    } catch (error) {
        console.error('Error reading series.xlsx:', error);
        throw new NotFoundException('Series data not found');
    }
}

export function transformSheetData(data: any[]): TrafficQuiz[] {
    const trimedData = trimData(data);

    return trimedData.map(row => ({
        questions: createQuestions(row, getCorrections(row)),
        image: row['Image'],
        audio: row['Audio'],
        justification: row['Justification'],
    }));
}

function createQuestions(row: any, corrections: number[]): TrafficQuestion[] {
    if (row['Question 2']) {
        return [
            createQuestion(row, 'Question 1', getResponses(row, '1', '2'), corrections.slice(0, 1)),
            createQuestion(row, 'Question 2', getResponses(row, '2.1', '2.2'), corrections.slice(1).map(v => v - 2))
        ];
    } else {
        return [createQuestion(row, 'Question 1', getResponses(row), corrections)];
    }
}

function createQuestion(row: any, questionKey: string, responses: string[], corrections: number[]): TrafficQuestion {
    return {
        question: row[questionKey],
        responses,
        correction: corrections,
    };
}

function getResponses(row: any, ...keys: (string | number)[]): string[] {
    if (keys.length === 0) {
        keys = Object.keys(row).filter(key => key.includes('Reponse'));
        return keys.map(key => row[key]);
    }

    return keys.map(key => row[`Reponse ${key}`]);
}

function getCorrections(row: any): number[] {
    const correctionString = row['Correction'] as string;
    const corrections = typeof correctionString === 'string' ?
        correctionString.split(',').map(Number) :
        [Number(correctionString)];

    return corrections.map(v => v - 1);
}

function trimData(data: any): any {
    const trimedData = [];
    data.map(row => {
        const trimedRow = {};
        for (const [key, value] of Object.entries(row)) {
            trimedRow[key] = (typeof value === 'string' ? value.trim() : value);
        }
        trimedData.push(trimedRow);
    });
    return trimedData;
}