export class QueriesUserDTO{
    name?: string;
    per_page?: number;
    page?: number;
    order_by?: 'name' | 'created_at' ;
    order?:'ASC' | 'DESC' ;
    created_at?: Date;
}