import { Controller, Post, Body, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { CreateAnalystRequest } from '../requests/create-analyst.request';
import { User } from '../../../common/decorators/user.decorator';
import { AnalystsService } from '../services/analysts.service';

@Controller('analysts')
export class AnalystsController {
  constructor(private readonly analystsService: AnalystsService) { }

  @Post()
  async create(@User() loggedUser, @Body() request: CreateAnalystRequest) {
    return await this.analystsService.create(loggedUser, request);
  }
}