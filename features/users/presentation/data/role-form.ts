import { UserRoleEnum } from "@/common/domain/users/entities";

export const roleFormOptions = [
    { value: UserRoleEnum.ADMIN, label: 'Administrador' },
    { value: UserRoleEnum.USER, label: 'Usuario' },
];