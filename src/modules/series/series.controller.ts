import { Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './series.service';
import { TrafficQuiz } from './series.dto';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) { }

    @Get('languages')
    getSeriesLanguages(): string[] {
        return this.seriesService.getAvilableLanguages();
    }

    @Get(':language/types')
    getSeriesTypes(@Param('language') language: string): string[] {
        return this.seriesService.getAvailableTypes(language);
    }

    @Get(':language/:type/count')
    getSeriesCount(@Param('language') language: string, @Param('type') type: string) {
        return this.seriesService.getSeriesCount(language, type);
    }

    @Get(':language/:type/:number')
    getSeriesByTypeAndNumber(@Param('language') language: string, @Param('type') type: string, @Param('number') number: string): TrafficQuiz[] {
        return this.seriesService.getSeries(language, type, number);
    }
}