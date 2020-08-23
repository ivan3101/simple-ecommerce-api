import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { File } from './file.entity';
import { S3Service } from '../s3/s3.service';
import { UploadedFileInterface } from '../s3/interfaces/uploaded-file.interface';

@Injectable()
export class FilesService {
  private readonly imageExtensions = ['jpg', 'jpeg', 'png'];
  private readonly pdfExtensions = ['pdf'];
  private readonly imageMimetype = 'image/';
  private readonly pdfMimetype = 'application/';

  constructor(@InjectRepository(File) private readonly file: Repository<File>, private readonly s3Service: S3Service) {}

  async createFile(file: string, directory = '/'): Promise<File> {
    const fileToUpload: UploadedFileInterface = this.getFileInfo(file);

    const uploadedFile = await this.s3Service.upload(fileToUpload, directory);

    const { filename, mimetype, size } = fileToUpload;

    const fileObject = {
      directory,
      name: filename,
      mimetype,
      size,
      url: uploadedFile.Location,
    };

    return this.file.save(fileObject);
  }

  deleteFile(file: File) {
    return this.file.remove(file);
  }

  private getFileInfo(file: string): UploadedFileInterface {
    const sanitizedFile = file.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(sanitizedFile, 'base64');

    const extension = file.split(';')[0].split('/')[1];
    const mimetype = this.getMimetype(extension);

    const filename = `${v4()}.${extension}`;

    const size = buffer.length;

    return {
      buffer,
      mimetype,
      filename,
      size,
    };
  }

  private getMimetype(extension: string): string {
    let mimetype = 'application/octet-stream';

    if (this.imageExtensions.includes(extension)) mimetype = this.imageMimetype + extension;
    else if (this.pdfExtensions.includes(extension)) mimetype = this.pdfMimetype + extension;

    return mimetype;
  }
}
