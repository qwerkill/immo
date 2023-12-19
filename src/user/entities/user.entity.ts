import { AdvertEntity } from "src/advert/entities/advert.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends CommonEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    name: string;
    
    @OneToMany(() => AdvertEntity, advert => advert.user)
    adverts: AdvertEntity[];

    @Column()
    created_at: Date;
}
