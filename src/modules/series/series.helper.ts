import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
import { TrafficQuestion, TrafficQuiz } from './series.dto';

export function getSeriesFilePath(language: string, type: string, number: string): string {
    return path.join('public/resources/series', language, type, `serie-${number}`, 'questions.xlsx');
}

function getImageFilePath(language: string, type: string, seriesNumber: string, questionNumber: string): string {
    try {
        const imageFormats = ['jpg', 'jpeg', 'png'];

        for (const format of imageFormats) {
            const imagePath = path.join('public/resources/series', language, type, `serie-${seriesNumber}/images`, `image-${questionNumber}.${format}`);
            console.log(imagePath);

            if (fs.existsSync(imagePath)) {
                return imagePath;
            }
        }

    } catch (error) {
        console.error(`Error : ${error}`);
        throw new NotFoundException("Image not found with the given format");
    }
}

function getAudioFilePath(language: string, type: string, seriesNumber: string, questionNumber: string): string {
    try {
        const audioPath = path.join('public/resources/series', language, type, `serie-${seriesNumber}/audios`, `audio-${questionNumber}.mp3`);

        if (fs.existsSync(audioPath)) {
            return audioPath;
        }
    } catch (error) {
        console.error(`Error ${error}`);
        throw new NotFoundException("Audio not found with the given format");
    }
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

export function transformSheetData(data: any[], { language, type, number }): TrafficQuiz[] {
    const trimedData = trimData(data);

    return trimedData.map((row, index) => ({
        questions: createQuestions(row, getCorrections(row)),
        image: getImageFilePath(language, type, number, index + 1),
        audio: getAudioFilePath(language, type, number, index + 1),
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