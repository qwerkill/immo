import { AdvertEntity } from "src/advert/entities/advert.entity";

export class UpdateUserDto {
    email: string;
    password: string;
    name: string;
    adverts: AdvertEntity[];
}

