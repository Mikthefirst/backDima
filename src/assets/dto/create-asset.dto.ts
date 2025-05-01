import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from "class-validator";

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  room_id: string;

  @IsString()
  @IsOptional()
  responsiblePerson: string;

  @IsNumber()
  depreciation: number;

  @IsDateString()
  acquisitionDate: Date;
}
