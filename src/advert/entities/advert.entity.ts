import { CommonEntity } from 'src/common/common.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';
import { UploadFileEntity } from 'src/upload-file/entities/upload-file.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity,PrimaryColumn, Column, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('advert')
export class AdvertEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    address:string;

    @Column()
    title:string;


    @ManyToOne(() => UserEntity, user => user.adverts, {nullable:true})
    user: UserEntity;

    @ManyToMany(()=> ServiceEntity, service => service.adverts)
    services: ServiceEntity[];

    @OneToMany(()=> UploadFileEntity, uploadFile => uploadFile.adverts)
    uploadFile: UploadFileEntity[];

}
