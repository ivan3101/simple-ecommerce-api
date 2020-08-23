import { Column, Entity, JoinColumn, OneToOne } from 'typeorm/index';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseEntity } from '../utils/base-entity.abstract';
import { File } from '../files/file.entity';

@Entity()
export class Product extends BaseEntity {
  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiResponseProperty()
  @OneToOne(() => File)
  @JoinColumn()
  image: File;
}
