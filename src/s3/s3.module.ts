import { S3 } from 'aws-sdk';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { S3Service } from './s3.service';
import { S3_CLIENT_OPTIONS, S3_OPTIONS, S3_SERVICE_OPTIONS } from './s3.constants';
import { IS3ModuleAsyncOptions, IS3ModuleOptions, IS3ServiceOptions } from './interfaces/module.interface';

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  static register(options: IS3ModuleOptions): DynamicModule {
    const optionsProvider: Provider<IS3ModuleOptions> = {
      provide: S3_OPTIONS,
      useValue: options,
    };

    return {
      module: S3Module,
      providers: [optionsProvider, ...this.createProviders()],
      exports: [optionsProvider, ...this.createProviders()],
    };
  }

  static registerAsync(options: IS3ModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider<IS3ModuleOptions | Promise<IS3ModuleOptions>> = {
      provide: S3_OPTIONS,
      inject: options.inject,
      useFactory: options.useFactory,
    };

    return {
      module: S3Module,
      imports: options.imports,
      providers: [optionsProvider, ...this.createProviders()],
      exports: [optionsProvider, ...this.createProviders()],
    };
  }

  protected static createClientOptionsProvider(): FactoryProvider<S3.ClientConfiguration> {
    return {
      provide: S3_CLIENT_OPTIONS,
      inject: [S3_OPTIONS],
      useFactory: (options: IS3ModuleOptions) => options.clientOptions,
    };
  }

  protected static createProviders(): Provider[] {
    return [S3Module.createClientOptionsProvider(), S3Module.createServiceOptionsProvider(), S3Module.createServiceProvider()];
  }

  protected static createServiceOptionsProvider(): FactoryProvider<IS3ServiceOptions> {
    return {
      provide: S3_SERVICE_OPTIONS,
      inject: [S3_OPTIONS],
      useFactory: (options: IS3ModuleOptions) => options.serviceOptions,
    };
  }

  protected static createServiceProvider(): FactoryProvider<S3Service> {
    return {
      provide: S3Service,
      inject: [S3_SERVICE_OPTIONS, S3_CLIENT_OPTIONS],
      useFactory: (options: IS3ServiceOptions, clientOptions: S3.ClientConfiguration) => new S3Service(options, clientOptions),
    };
  }
}
