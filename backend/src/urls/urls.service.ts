import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  /**
   * Creates a shortened URL slug for the given original URL.
   * If the URL has already been shortened, returns the existing slug.
   *
   * param: original_url - The original URL to be shortened
   * returns: An object containing the slug
   */
  async create(original_url: string): Promise<{ slug: string }> {
    // Check if the original URL is already registered
    const existing = await this.urlRepository.findOne({
      select: ['slug'],
      where: { originalUrl: original_url },
    });

    // Return the existing slug if found
    if (existing) {
      return existing;
    }

    // Try generating and saving a unique slug
    let slug: string;

    // Keep trying until we find a unique slug
    while (true) {
      slug = nanoid();

      const slugExists = await this.urlRepository.findOne({
        where: { slug },
      });

      if (!slugExists) {
        break;
      }
    }

    const url = this.urlRepository.create({ originalUrl: original_url, slug });
    await this.urlRepository.save(url);

    return { slug: url.slug };
  }

  /**
   * Retrieves the original URL associated with the given slug.
   *
   * param: slug - The slug to look up
   * returns: The corresponding Url entity or null if not found
   */
  async findBySlug(slug: string): Promise<Url | null> {
    return this.urlRepository.findOne({ where: { slug: slug } });
  }
}
