// close-report.dto.ts
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ReportStatus } from "../enums/status.enum";

export class CloseReportDto {
  @IsEnum(ReportStatus)
  status: ReportStatus;

  @IsOptional()
  @IsString()
  comment?: string;
}
