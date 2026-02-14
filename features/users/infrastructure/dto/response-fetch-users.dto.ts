import { User } from "@/common/domain/users/entities";

export interface ResponseFetchUsersDto {
    users: User[];
    total: number;
}