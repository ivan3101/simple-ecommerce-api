import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Base64 representation of the product's image" })
  @IsString()
  @IsNotEmpty()
  image: string;
}
