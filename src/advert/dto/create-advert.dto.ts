import { UserEntity } from "src/user/entities/user.entity";

export class CreateAdvertDto {
    address: string;
    title: string;
    user:UserEntity;
}
