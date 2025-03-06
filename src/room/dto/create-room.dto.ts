import {
  IsInt,
  IsNotEmpty,
  IsOptional
} from 'class-validator';


export class CreateRoomDto {
  @IsInt()
  room_number: number;
  
  @IsOptional()
  owner_id: string;
  
  @IsNotEmpty()
  building_id: number;
}
