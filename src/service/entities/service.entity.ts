import { AdvertEntity } from "src/advert/entities/advert.entity";
import { CommonEntity } from "src/common/common.entity";
import { UploadFileEntity } from "src/upload-file/entities/upload-file.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('services')
export class ServiceEntity  extends CommonEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(()=> UploadFileEntity, uploadFile => uploadFile.services)
    uploadFile: UploadFileEntity[];

    // @ManyToMany(()=> AdvertEntity, advert => advert.services)
    // adverts: AdvertEntity[];
}
