import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Url } from '../../urls/entities/url.entity';

@Entity('url_visits')
export class UrlVisit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Url)
  url: Url;

  @CreateDateColumn()
  visitedAt: Date;
}
