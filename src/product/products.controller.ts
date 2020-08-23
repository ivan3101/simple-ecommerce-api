import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ListProductsResponseDto } from './dto/list-products-response.dto';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { PaginationQuery, PaginationQueryInteface } from '../utils/query-decorators/pagination.query';
import { ParseIntPipe } from '../utils/pipes/parseInt.pipe';
import { UnauthorizedException, UnexpectedErrorException, ValidationException } from '../utils/exceptions/exceptions';
import { CheckUserIsAdminGuard } from '../auth/guards/check-user-is-admin.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    description: 'List all the products',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ListProductsResponseDto,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: UnexpectedErrorException,
  })
  listCategories(@PaginationQuery() paginationQuery: PaginationQueryInteface) {
    return this.productsService.listAllProducts(paginationQuery);
  }

  @UseGuards(AuthGuard, CheckUserIsAdminGuard)
  @Post()
  @ApiOperation({
    description: `Create a product`,
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: Product,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: UnexpectedErrorException,
  })
  createCategory(@Body() createProductDto: CreateProductRequestDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':productId')
  @ApiOperation({
    description: `Get the details of a product`,
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'productId',
    required: true,
    type: 'number',
  })
  @ApiOkResponse({
    type: Product,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: UnexpectedErrorException,
  })
  getCategory(@Param('productId', new ParseIntPipe({ required: true })) productId: number) {
    return this.productsService.getProductById(productId);
  }
}
