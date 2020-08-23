import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
