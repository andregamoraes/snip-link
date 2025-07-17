import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlVisit } from './entities/url-visit.entity';
import { Url } from '../urls/entities/url.entity';

/**
 * Represents a summarized view of a shortened URL
 * including the total number of visits.
 */
export interface MostVisitedUrl {
  urlId: string;
  slug: string;
  originalUrl: string;
  visitCount: number;
}

@Injectable()
export class UrlVisitsService {
  constructor(
    @InjectRepository(UrlVisit)
    private readonly visitRepository: Repository<UrlVisit>,
  ) {}

  /**
   * Records a new visit for the given shortened URL.
   *
   * param: url The Url entity that was visited.
   * returns: The newly created UrlVisit entity.
   */
  async createVisit(url: Url): Promise<UrlVisit> {
    const visit = this.visitRepository.create({ url });
    return await this.visitRepository.save(visit);
  }

  /**
   * Retrieves statistics related to URL visits.
   * - `total`: the total number of visits across all shortened URLs.
   * - `top`: the top 5 most visited shortened URLs ordered by visit count.
   *
   * returns: An object containing the total number of visits and
   *          the list of top 5 most visited URLs.
   */
  async getVisitStats(): Promise<{
    total: number;
    top: MostVisitedUrl[];
  }> {
    // Count total number of visits in the url_visit table
    const total = await this.visitRepository.count();

    // Retrieve top 5 most visited URLs grouped and ordered by visit count
    const top = await this.visitRepository
      .createQueryBuilder('visit')
      .leftJoin('visit.url', 'url')
      .select('url.id', 'urlId')
      .addSelect('url.slug', 'slug')
      .addSelect('url.originalUrl', 'originalUrl')
      .addSelect('CAST(COUNT(*) AS INTEGER)', 'visitCount')
      .groupBy('url.id')
      .orderBy('COUNT(*)', 'DESC')
      .limit(5)
      .getRawMany<MostVisitedUrl>();

    return { total, top };
  }
}
