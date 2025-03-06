import { IsString, IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  room: string;

  @IsString()
  @IsNotEmpty()
  responsiblePerson: string;

  @IsNumber()
  depreciation: number;

  @IsDateString()
  acquisitionDate: Date;
}
