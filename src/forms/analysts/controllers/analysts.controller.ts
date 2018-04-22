import { Controller, Post, Body, Get, HttpCode, HttpStatus, Request, ParseIntPipe, Param } from '@nestjs/common';
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

  @Get()
  async findAll(@User() loggedUser) {
    return await this.analystsService.findAll(loggedUser);
  }

  @Get(':id')
  async findById(@User() loggedUser, @Param('id', new ParseIntPipe()) id) {
    return await this.analystsService.findById(loggedUser, id);
  }
}