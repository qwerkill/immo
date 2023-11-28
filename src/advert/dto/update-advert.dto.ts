import { UserEntity } from "src/user/entities/user.entity";


export class UpdateAdvertDto {
    address: string;
    title: string;
    user: UserEntity;
}
