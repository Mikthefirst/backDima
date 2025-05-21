// create-report.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Urgency } from "../enums/urgency.enum";
import { ReportStatus } from "../enums/status.enum";

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  detailed_desc: string;

  @IsUUID()
  @IsOptional()
  assetId?: string;

  @IsUUID()
  @IsOptional()
  mbpId?: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;

  @IsEnum(Urgency)
  @IsOptional()
  urgency?: Urgency;

  @IsUUID()
  @IsNotEmpty()
  createdById: string;

  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}
