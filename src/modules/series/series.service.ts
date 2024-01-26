import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TrafficQuiz } from './series.dto';
import { getSeriesFilePath, readWorkbook, transformSheetData } from './series.helper';

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

  getSeries(type: string, number: string): TrafficQuiz[] {
    this.seriesFilePath = getSeriesFilePath(type, number);
    const sheetData = readWorkbook(this.seriesFilePath);
    return transformSheetData(sheetData);
  }
}