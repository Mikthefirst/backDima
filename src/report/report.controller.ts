import { UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CloseReportDto } from './dto/close-report.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller("report")
//@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() dto: CreateReportDto) {
    console.log("dto", dto);
    return this.reportService.create(dto);
  }

  @Patch(":id/close")
  close(@Param("id") id: string, @Body() dto: CloseReportDto) {
    return this.reportService.closeReport(id, dto);
  }

  @Get()
  findAll() {
    return this.reportService.getAll();
  }

  @Get("count")
  count(): Promise<number> {
    const count = this.reportService.count();
    return count;
  }
}
