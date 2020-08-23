import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseEntity } from '../utils/base-entity.abstract';

@Entity('dashboard_files')
export class File extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @Column()
  directory: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  mimetype: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  size: number;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  url: string;
}
