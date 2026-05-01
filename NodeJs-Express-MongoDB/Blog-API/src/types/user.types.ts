import type { UserRoles } from "../utils/Enums.js";
import type { PaginationQueryParams } from "./common.types.js";

export interface UsersQueryParams extends PaginationQueryParams{
    role?: UserRoles
}