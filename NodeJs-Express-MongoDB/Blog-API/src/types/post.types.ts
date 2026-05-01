import type { PaginationQueryParams } from "./common.types.js";

export interface PostsQueryParams extends PaginationQueryParams {
    author?: string,
    tags?: string[]
}