import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { faker } from '@faker-js/faker';
import { UserService } from 'src/user/user.service';



@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min ) + min);
    }

  createFixturesAdverts() {
    const users =  this.createFixturesUsers();

    for (let i = 0; i < 100; i++){

      const RandomUser = users[this.randomNum(0,users.length)]

      this.advertService.create({
        title: faker.lorem.words(3), 
        price: this.randomNum(200,2000),  
        nb_rooms: this.randomNum(1,6), 
        square_meters: this.randomNum(9,120), 
        description: faker.lorem.paragraph(3), 
        phoneNumber: faker.phone.number(), 
        user: RandomUser,
      })
    }
    return {
      message: 'Fixtures created',
    }
  }

  createFixturesUsers() {
    const users = []
    for (let i = 0; i < 10; i++){
      users.push(
        this.userService.create({
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.lorem.word(1),
        })
      )
    }
    return users;
}
}
