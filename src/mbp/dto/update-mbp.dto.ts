import { PartialType } from '@nestjs/mapped-types';
import { CreateMbpDto } from './create-mbp.dto';

export class UpdateMbpDto extends PartialType(CreateMbpDto) {}
