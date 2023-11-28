https://www.petenetlive.com/KB/Article/0001417


# Generation de module / entity 

nest g resource resource-name




// adverts module
  @PrimaryColumn()
    id:number;

    @Column()
    address:string;

    @Column()
    title:string;

    @Column()
    state:string;

    @Column()
    nbRooms:number;

    @Column()
    dpe:string;
    
    @Column()
    gse:string;

    @Column()
    price:number;

    @Column()
    surface:number;

    @ManyToOne(() => UserEntity, user => user.adverts)
    user: UserEntity;

    @ManyToMany(()=> ServiceEntity, service => service.adverts)
    services: ServiceEntity[];

    @OneToMany(()=> UploadFileEntity, uploadFile => uploadFile.adverts)
    uploadFile: UploadFileEntity[];