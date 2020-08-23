import * as path from 'path';
import { AWSError, S3 } from 'aws-sdk';
import { Inject, Injectable } from '@nestjs/common';

import { S3_OPTIONS } from './s3.constants';
import { UploadedFileInterface } from './interfaces/uploaded-file.interface';
import { IS3ServiceOptions } from './interfaces/module.interface';
import { ResourceNotFoundException } from '../utils/exceptions/exceptions';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(
    @Inject(S3_OPTIONS) private readonly options: IS3ServiceOptions,
    @Inject(S3_OPTIONS) private readonly clientOptions: S3.ClientConfiguration,
  ) {
    this.s3 = new S3(clientOptions);
  }

  upload(file: UploadedFileInterface, subpath = '/', options: Partial<S3.PutObjectRequest> = {}): Promise<S3.ManagedUpload.SendData> {
    const bucket = options.Bucket || this.options.defaultBucket;
    const finalKey = S3Service.getFinalKey(file.filename, subpath);
    const params = Object.assign<Partial<S3.PutObjectRequest>, S3.PutObjectRequest>(options, {
      Key: finalKey,
      Bucket: bucket,
      ContentType: file.mimetype,
      ContentLength: file.size,
      Body: file.buffer,
      ACL: 'public-read',
    });

    return this.s3.upload(params).promise();
  }

  async delete(filename: string, subpath: string, options: Partial<S3.DeleteObjectRequest> = {}): Promise<S3.DeleteObjectOutput> {
    const bucket = options.Bucket || this.options.defaultBucket;
    const finalKey = S3Service.getFinalKey(filename, subpath);
    const params = Object.assign<Partial<S3.DeleteObjectRequest>, S3.DeleteObjectRequest>(options, {
      Key: finalKey,
      Bucket: bucket,
    });

    await this.checkIfFileExists(params);

    return this.s3.deleteObject(params).promise();
  }

  private async checkIfFileExists(options: S3.HeadObjectRequest) {
    try {
      await this.s3.headObject(options).promise();
    } catch (e) {
      S3Service.formatS3Error(e, options.Key);
    }
  }

  private static formatS3Error(error: AWSError, Key: string) {
    if (error.statusCode === 404) {
      return new ResourceNotFoundException('File', Key);
    }

    return error;
  }

  private static getFinalKey(filename: string, subpath: string) {
    return path.join(subpath, filename);
  }
}
