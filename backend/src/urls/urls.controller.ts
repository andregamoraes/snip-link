// src/urls/urls.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UrlsService } from './urls.service';

@Controller('api/urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Throttle({
    default: {
      limit: 10,
      ttl: 1000,
    },
  })
  @Post()
  async create(@Body('original_url') original_url: string) {
    return await this.urlsService.create(original_url);
  }
}
