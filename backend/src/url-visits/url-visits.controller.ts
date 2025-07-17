import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UrlVisitsService } from './url-visits.service';

@Controller('api/url-visits')
export class UrlVisitsController {
  constructor(private readonly urlVisitsService: UrlVisitsService) {}

  @Throttle({
    default: {
      limit: 10,
      ttl: 1000,
    },
  })
  @Get()
  async getVisitStats() {
    return this.urlVisitsService.getVisitStats();
  }
}
