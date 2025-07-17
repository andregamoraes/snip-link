import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlsService } from './urls.service';
import { UrlVisitsService } from '../url-visits/url-visits.service';

@Controller()
export class UrlRedirectController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly visitsService: UrlVisitsService,
  ) {}

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlsService.findBySlug(slug);
    if (url) {
      await this.visitsService.createVisit(url);
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send('404 - Not Found');
    }
  }
}
