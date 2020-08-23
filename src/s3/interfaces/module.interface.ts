import { S3 } from 'aws-sdk';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface IS3ModuleOptions {
  clientOptions: S3.ClientConfiguration;
  serviceOptions: IS3ServiceOptions;
}

export interface IS3ServiceOptions {
  basePath?: string;
  defaultBucket: string;
}

export interface IS3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory: (...args: any[]) => Promise<IS3ModuleOptions> | IS3ModuleOptions;
}
