import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateInventoryDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  store: string;
}
