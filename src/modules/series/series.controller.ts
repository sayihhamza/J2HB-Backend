import { Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './series.service';
import { TrafficQuiz } from './series.dto';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) { }

    @Get('types')
    getSeriesTypes(): string[] {
        return this.seriesService.getAvailableTypes();
    }

    @Get(':type/count')
    getSeriesCount(@Param('type') type: string) {
        return this.seriesService.getNumberOfSeriesForType(type);
    }

    @Get(':type/:number')
    getSeriesByTypeAndNumber(@Param('type') type: string, @Param('number') number: string): TrafficQuiz[] {
        return this.seriesService.getSeries(type, number);
    }
}