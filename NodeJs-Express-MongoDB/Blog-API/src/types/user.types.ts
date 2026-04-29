import type { UserRoles } from "../utils/Enums.js";

export interface UsersQueryParams {
    page: number,
    limit: number,
    role?: UserRoles
}