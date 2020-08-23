import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FilesSubscriber } from './files.subscriber';
import { FilesService } from './files.service';
import { File } from './file.entity';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    S3Module.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('s3'),
    }),
  ],
  providers: [FilesService, FilesSubscriber],
  exports: [FilesService],
})
export class FilesModule {}
