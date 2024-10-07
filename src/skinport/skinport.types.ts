

export interface SkinportItem {
    market_hash_name: string;
    currency: string;
    suggested_price: number;
    item_page: string;
    market_page: string;
    min_price: number;
    max_price: number;
    mean_price: number;
    quantity: number;
    created_at: number;
    updated_at: number;
}

export interface SkinportError {
    id: string;
    message: string;
}

export interface SkinportItemHistory {
    market_hash_name: string;
    currency: string;
    item_page: string;
    market_page: string;
    sales: SkinportItemHistorySale[];
    [key: `last_${string}`]: SkinportItemHistoryLastStatistic;
}

export interface SkinportItemHistorySale {
    price: number
    wear_value: any
    sold_at: number
}

export interface SkinportItemHistoryLastStatistic {
    min: number | null;
    max: number | null;
    avg: number | null;
    volume: number;
}

export interface SkinportOutOfStock {
    market_hash_name: string;
    version: string | null;
    currency: string;
    suggested_price: number;
    avg_sale_price: number;
    sales_last_90d: number;
}

export interface SkinportTransactions {
    pagination: SkinportTransactionsPagination;
    data: SkinportTransactionsData[];
}

export interface SkinportTransactionsPagination {
    page: number;
    pages: number;
    limit: number;
    order: string;
}

export interface SkinportTransactionsData {
    id: number;
    type: string;
    sub_type?: string;
    status: string;
    amount: number;
    fee?: number;
    currency: string;
    items?: SkinportTransactionsItem[];
    created_at: string;
    updated_at: string;
}

export interface SkinportTransactionsItem {
    sale_id: number;
    market_hash_name: string;
    seller_country: string;
    buyer_country: string;
}

export enum SkinportTransactionSortOrderEnum{
    ASC = 'asc',
    DESC = 'desc'
}