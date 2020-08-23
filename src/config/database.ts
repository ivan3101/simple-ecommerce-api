import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;

export default {
  type: 'mysql',
  database: DB_NAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  username: DB_USER,
  entities: [path.resolve(__dirname, '..', '**/**.entity!(*.d).{ts,js}')],
  subscribers: [path.resolve(__dirname, '..', '**/**.subscriber!(*.d).{ts,js}')],
  synchronize: NODE_ENV !== 'production',
  logging: NODE_ENV !== 'production',
} as TypeOrmModuleOptions;
