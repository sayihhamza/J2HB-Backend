import { Controller, Get } from '@nestjs/common';
import { SeriesService } from './series.service';
import { TrafficQuiz } from './series.dto';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) { }

    @Get()
    getSeries(): TrafficQuiz[] {
        return this.seriesService.getSeries();
    }
}