import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TrafficQuiz } from './series.dto';
import { getSeriesFilePath, readWorkbook, transformSheetData } from './series.helper';

@Injectable()
export class SeriesService {
  private seriesFilePath: string;

  getAvilableLanguages(): string[] {
    const seriesPath = 'public/resources/series';
    return fs.readdirSync(seriesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  getAvailableTypes(language: string): string[] {
    const seriesPath = `public/resources/series/${language}`;
    return fs.readdirSync(seriesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  getSeriesCount(language: string, type: string): number {
    const seriesPath = path.join('public/resources/series', language, type);
    const seriesFiles = fs.readdirSync(seriesPath);
    return seriesFiles.length;
  }

  getSeries(language: string, type: string, number: string): TrafficQuiz[] {
    this.seriesFilePath = getSeriesFilePath(language, type, number);
    const sheetData = readWorkbook(this.seriesFilePath);
    return transformSheetData(sheetData, { language, type, number });
  }
}