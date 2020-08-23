import { ApiResponseProperty } from '@nestjs/swagger';

import { Product } from '../product.entity';

export class ListProductsResponseDto {
  @ApiResponseProperty({ type: Product })
  items: Product[];

  @ApiResponseProperty()
  total: number;
}
