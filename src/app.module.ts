import * as path from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';

import { ClassValidatorErrorsToValidationExceptionFactory } from './utils/exceptions/helpers';
import { GeneralExceptionFilter, NotFoundExceptionFilter, UnauthorizedExceptionFilter } from './utils/exceptions/filters';
import { UsersModule } from './user/users.module';
import { ProductsModule } from './product/products.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

const configFiles = path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}');

const appInterceptorFactory = (cons) => ({
  provide: APP_INTERCEPTOR,
  useClass: cons,
});

const appFilterFactory = (cons) => ({
  provide: APP_FILTER,
  useClass: cons,
});

const appPipeFactory = (cons) => ({
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    whitelist: true,
    validationError: { target: false, value: false },
    exceptionFactory: cons,
  }),
});

@Module({
  imports: [
    ConfigModule.load(configFiles),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database') as TypeOrmModuleOptions,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    appFilterFactory(GeneralExceptionFilter),
    appFilterFactory(NotFoundExceptionFilter),
    appFilterFactory(UnauthorizedExceptionFilter),
    appPipeFactory(ClassValidatorErrorsToValidationExceptionFactory),
    appInterceptorFactory(ClassSerializerInterceptor),
    AppService,
  ],
})
export class AppModule {}
