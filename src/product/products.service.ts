import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Product } from './product.entity';
import { ListProductsResponseDto } from './dto/list-products-response.dto';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { PaginationQueryInteface } from '../utils/query-decorators/pagination.query';
import { ValidationException } from '../utils/exceptions/exceptions';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductsService {
  private readonly checkIfIsBase64Regex = /([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  private readonly filesDirectory = 'products';

  constructor(@InjectRepository(Product) private readonly product: Repository<Product>, private readonly filesService: FilesService) {}

  async createProduct(data: CreateProductRequestDto) {
    const { image, ...remainingProperties } = data;

    this.checkIfFileIsBase64([image]);

    const imageUploaded = await this.filesService.createFile(image, this.filesDirectory);

    return this.product.save({
      ...remainingProperties,
      image: imageUploaded,
    });
  }

  async listAllProducts(paginationQuery: PaginationQueryInteface): Promise<ListProductsResponseDto> {
    const { skip, take } = paginationQuery;

    const [items, total] = await this.product.findAndCount({ skip, take, order: { createdAt: 'DESC' }, relations: ['image'] });

    return {
      items,
      total,
    };
  }

  getProductById(id: number) {
    return this.product.findOne({ id }, { relations: ['image'] });
  }

  private checkIfFileIsBase64(files: string[]) {
    for (const file of files) {
      if (!file) continue;

      const isValid = this.checkIfIsBase64Regex.test(file);

      if (!isValid) {
        throw new ValidationException([
          {
            path: 'file',
            value: file,
            validation: 'one or more of the files are not a base64 string',
            message: '',
          },
        ]);
      }
    }
  }
}
