import { Connection, EntitySubscriberInterface, RemoveEvent } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { File } from './file.entity';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class FilesSubscriber implements EntitySubscriberInterface<File> {
  constructor(@InjectConnection() private readonly connection: Connection, private readonly s3Service: S3Service) {
    this.connection.subscribers.push(this);
  }

  afterRemove(event: RemoveEvent<File>): Promise<any> {
    const { entity } = event;

    return this.s3Service.delete(entity.name, entity.directory);
  }

  listenTo() {
    return File;
  }
}
