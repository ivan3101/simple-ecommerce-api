import { ConfigService } from 'nestjs-config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { UsersService } from './user/users.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 100,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  const options = new DocumentBuilder().setTitle('Example').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('*explorer', app, document);

  const usersService: UsersService = app.get(UsersService);
  await usersService.createDefaultAdminUser();

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('application.port'));
}
bootstrap();
