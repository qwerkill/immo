import { AdvertEntity } from 'src/advert/entities/advert.entity';
import { CommonEntity } from 'src/common/common.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity('upload-file')
export class UploadFileEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    path:string;

    @ManyToOne(() => ServiceEntity, service => service.uploadFile)
    services: ServiceEntity;

    @ManyToOne(() => AdvertEntity, advert => advert.uploadFile)
    adverts: AdvertEntity;
}
