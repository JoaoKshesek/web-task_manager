export interface Pagination<Data> {
    total: number
    per_page: number
    current_page: number
    last_page: number
    data: Data[]
}
