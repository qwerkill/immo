import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertEntity } from './entities/advert.entity';
import { Repository } from 'typeorm';
import { QueriesAdvertsDTO } from './dto/queries-adverts.dto';

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

  async findAll(queries:QueriesAdvertsDTO) {

    const {
      min_price,
      max_price,
      min_nb_rooms,
      max_nb_rooms,
      min_square_meters,
      max_square_meters,
      name,
      order = 'ASC' ,
      order_by = 'price',
      per_page = 10,
      page = 1,
    } = queries;


    
      try{
        const query = await this.advertRepository
          .createQueryBuilder('advert')
          .leftJoinAndSelect('advert.user', 'user')
          if(min_price ){
            query.andWhere('advert.price >= :min_price', {min_price})
          }
          if(max_price){
            query.andWhere('advert.price <= :max_price', {max_price})
          }

          if(min_nb_rooms){
            query.andWhere('advert.nb_rooms >= :min_nb_rooms', {min_nb_rooms})
          }
          if(max_nb_rooms){
            query.andWhere('advert.nb_rooms <= :max_nb_rooms', {max_nb_rooms})
          }

          if(min_square_meters){
            query.andWhere('advert.square_meters >= :min_square_meters', {min_square_meters})
          }
          if(max_square_meters){
            query.andWhere('advert.square_meters <= :max_square_meters', {max_square_meters})
          }
          if(name){
            query.andWhere('user.name = :name', {name})
          }

          query.orderBy(`advert.${order_by}`, order)

          query.take(per_page)
          query.offset((page -1) * per_page)

        const [data, count] = await  query.getManyAndCount()
        
        return {
          data ,
          count,
          per_page,
          page,
          last_page: Math.ceil(count/per_page),
        }
      } catch (error) {
        throw  new Error(error)
      }
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
