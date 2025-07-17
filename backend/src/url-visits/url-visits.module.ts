import { Module } from '@nestjs/common';
import { UrlVisitsService } from './url-visits.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlVisit } from './entities/url-visit.entity';
import { UrlVisitsController } from './url-visits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UrlVisit]), ConfigModule],
  providers: [UrlVisitsService],
  exports: [UrlVisitsService],
  controllers: [UrlVisitsController],
})
export class UrlVisitsModule {}
