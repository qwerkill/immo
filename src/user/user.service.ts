import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async findAll() {
    const query = await this.userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.adverts", "adverts");

    const usersList =  query.getMany();

    return usersList;
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
      const updatedUser = await this.userRepository.update(user,updateUserDto);
      return updatedUser;      
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
