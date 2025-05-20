import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsEnum,
} from "class-validator";
import { Category } from "./enums/cat.enum";

export class CreateMbpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Category)
  category: Category;

  @IsInt()
  overallQuantity: number;

  @IsInt()
  minQuantity: number;

  @IsDateString()
  expiryDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
