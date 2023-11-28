import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertEntity } from './entities/advert.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(AdvertEntity)
    private readonly advertRepository: Repository<AdvertEntity>,
  ) {}
  create(createAdvertDto: CreateAdvertDto) {
    try{
      const advert = this.advertRepository.create(createAdvertDto);
      return this.advertRepository.save(advert);
    } catch (error) {
      throw  new Error(error)
    }
  }

  async findAll() {
      const advertsList = await this.advertRepository.find();
      return advertsList; 
  }

  async findOne(id: number) {
    const advert = await this.advertRepository.findOneBy({id: id});
    if(!advert) throw new HttpException('Advert not found',HttpStatus.NOT_FOUND);

    return advert;
  }

  async update(id: number, updateAdvertDto: UpdateAdvertDto) {
    const advert = await this.findOne(id);

    try{
      const updatedAdvert = await this.advertRepository.update(advert,updateAdvertDto);
      return updatedAdvert;      
    } catch (error) {
      throw  new Error(error)
    }
  }

  async remove(id: number) {
      const advert = await this.findOne(id);
    try{
      return this.advertRepository.softRemove(advert);
    } catch (error) {
      throw  new Error(error)
    }
  }
}
