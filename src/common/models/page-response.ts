import { PaginationInfo } from "./pagination-info";

export interface PageResponse<T> {
    page_content : T[];
    pagination_info : PaginationInfo ;
}