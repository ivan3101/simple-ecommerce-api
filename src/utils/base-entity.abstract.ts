import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiResponseProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;
}
