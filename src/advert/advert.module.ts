import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { AdvertEntity } from './entities/advert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports :[
    TypeOrmModule.forFeature([AdvertEntity])
  ],
  controllers: [AdvertController],
  providers: [AdvertService],
  exports: [AdvertService],
})
export class AdvertModule {}
