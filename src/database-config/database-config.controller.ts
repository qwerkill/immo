import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';


@Controller('fixtures')
export class DatabaseConfigController {
  constructor(private readonly serviceService: DatabaseConfigService) {}

  @Post('adverts')
  createFixturesAdverts() {
    return this.serviceService.createFixturesAdverts();
  }
 
}
