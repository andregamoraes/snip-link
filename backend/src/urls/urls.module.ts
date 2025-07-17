import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlRedirectController } from './urls-redirect.controller';
import { UrlsService } from './urls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { ConfigModule } from '@nestjs/config';
import { UrlVisitsModule } from '../url-visits/url-visits.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ConfigModule, UrlVisitsModule],
  controllers: [UrlsController, UrlRedirectController],
  providers: [UrlsService],
})
export class UrlsModule {}
