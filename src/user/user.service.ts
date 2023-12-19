import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueriesUserDTO } from './dto/queries-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try{
    const user =  await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
    } catch (error) {
      throw  new Error(error)
    }

  }

  async findAll(queries: QueriesUserDTO) {

    const {
      name,
      per_page = 10,
      page = 1,
      order = 'ASC' ,
      order_by = 'name',
      created_at,
    } = queries;


    
    try {
      const query = await this.userRepository
        .createQueryBuilder('user')
        if(name){
          query.andWhere('user.name = :name', {name})
        }
        if(created_at){
          query.andWhere('user.created_at = :created_at', {created_at})
        }
        query.orderBy(`user.${order_by}`, order);
        query.skip((page - 1) * per_page);
        query.take(per_page);

        const [data, count] = await query.getManyAndCount();

        return {
          data,
          count,
          page,
          per_page,
        };
    } catch (error) {
      throw  new Error(error)
    }
  }

  async findOne(id: number) {
    const query = await this.userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.adverts", "adverts")
      .where("user.id = :id", { id });
    
      const user =  query.getOne();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    try{
      return await this.userRepository.update(user,updateUserDto);
    } catch (error) {
      throw  new Error(error)
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    try{
      return this.userRepository.softRemove(user);
    } catch (error) {
      throw  new Error(error)
    }
  }
}
