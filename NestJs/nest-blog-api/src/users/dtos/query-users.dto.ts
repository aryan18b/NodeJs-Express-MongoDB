import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/enums/user-role.enum";

export class QueryUsersDto {
    @IsOptional()
    @IsEnum(UserRole)
    role!: UserRole;
}