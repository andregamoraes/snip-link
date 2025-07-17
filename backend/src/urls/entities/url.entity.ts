import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  originalUrl: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  createdAt: Date;
}
