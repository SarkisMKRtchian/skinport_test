import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SkinportError, SkinportItem, SkinportItemHistory, SkinportOutOfStock, SkinportTransactions, SkinportTransactionSortOrderEnum } from './skinport.types';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SkinportService {
    private readonly _instance: AxiosInstance;
    private readonly _logger: Logger;

    private readonly _baseUrl: string;
    private readonly _itemsPath: string;
    private readonly _historyPath: string;
    private readonly _outOfStockPath: string;
    private readonly _transactionsPath: string;

    private readonly _clientId: string;
    private readonly _clientSecret: string;


    constructor(
        private readonly redisService: RedisService
    ){
        this._baseUrl = 'https://api.skinport.com/v1';
        this._itemsPath = '/items';
        this._historyPath = '/sales/history';
        this._outOfStockPath = '/sales/out-of-stock';
        this._transactionsPath = '/account/transactions';
        this._clientId = process.env.SKINPORT_CLIENT_ID;
        this._clientSecret = process.env.SKINPORT_CLIENT_SECRET;

        this._logger = new Logger(SkinportService.name);

        const instance = axios.create({
            baseURL: this._baseUrl,
            timeout: 1000,
            headers: {
                'Authorization': `Basic ${Buffer.from(`${this._clientId}:${this._clientSecret}`).toString('base64')}`
            }
        })

        this._instance = instance;
    }


    public async getItems(app_id?: number, currency?: string, tradable?: boolean): Promise<SkinportItem[]> {
        try{
            const chacheKey = `skinport_items_${app_id}_${currency}_${tradable}`;
            const chacheData = await this.redisService.get(chacheKey);

            if(chacheData) return JSON.parse(chacheData);

            const searchParams = new URLSearchParams();
            if(app_id) searchParams.append('app_id', app_id.toString());
            if(currency) searchParams.append('currency', currency);
            if(tradable) searchParams.append('tradable', tradable.toString());

            const response = await this._instance.get<SkinportItem[]>(this._itemsPath + '?' + searchParams.toString());

            const data = response.data;
            
            await this.redisService.set(chacheKey, JSON.stringify(data), 60 * 5);
            return data;
        }catch(exception){
            if(exception instanceof AxiosError){
                const err = exception as AxiosError<SkinportError[]>;
                throw new HttpException(err.response?.data, err.response?.status);
            }

            throw new HttpException((exception as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getHistory(market_hash_name: string, app_id?: number, currency?: string): Promise<SkinportItemHistory[]> {
        try{
            const chacheKey = `skinport_history_${market_hash_name}_${app_id}_${currency}`;
            const chacheData = await this.redisService.get(chacheKey);
            
            if(chacheData) return JSON.parse(chacheData);

            const searchParams = new URLSearchParams();
            searchParams.append('market_hash_name', market_hash_name);
            if(app_id) searchParams.append('app_id', app_id.toString());
            if(currency) searchParams.append('currency', currency);

            const response = await this._instance.get<SkinportItemHistory[]>(this._historyPath + '?' + searchParams.toString());

            const data = response.data;
            
            await this.redisService.set(chacheKey, JSON.stringify(data), 60 * 5);
            return data;
        }catch(exception){
            if(exception instanceof AxiosError){
                const err = exception as AxiosError<SkinportError[]>;
                throw new HttpException(err.response?.data, err.response?.status);
            }

            throw new HttpException((exception as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getOutOfStock(app_id?: number, currency?: string): Promise<SkinportOutOfStock[]> {
        try{
            const chacheKey = `skinport_out_of_stock_${app_id}_${currency}`;
            const chacheData = await this.redisService.get(chacheKey);

            if(chacheData) return JSON.parse(chacheData);

            const searchParams = new URLSearchParams();
            if(app_id) searchParams.append('app_id', app_id.toString());
            if(currency) searchParams.append('currency', currency);

            const response = await this._instance.get<SkinportOutOfStock[]>(this._outOfStockPath + '?' + searchParams.toString());

            const data = response.data;

            await this.redisService.set(chacheKey, JSON.stringify(data), 60 * 60);
            return data;
        }catch(exception){
            if(exception instanceof AxiosError){
                const err = exception as AxiosError<SkinportError[]>;
                throw new HttpException(err.response?.data, err.response?.status);
            }

            throw new HttpException((exception as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getTransactions(page?: number, limit?: number, order?: SkinportTransactionSortOrderEnum): Promise<SkinportTransactions[]> {
        try{
            const chacheKey = `skinport_transactions_${page}_${limit}_${order}`;
            const chacheData = await this.redisService.get(chacheKey);

            if(chacheData) return JSON.parse(chacheData);

            const searchParams = new URLSearchParams();
            if(page) searchParams.append('page', page.toString());
            if(limit) searchParams.append('limit', limit.toString());
            if(order) searchParams.append('order', order);

            const response = await this._instance.get<SkinportTransactions[]>(this._transactionsPath + '?' + searchParams.toString());

            const data = response.data;

            await this.redisService.set(chacheKey, JSON.stringify(data), 60 * 5);
            return data;
        }catch(exception){
            if(exception instanceof AxiosError){
                const err = exception as AxiosError<SkinportError[]>;
                throw new HttpException(err.response?.data, err.response?.status);
            }

            throw new HttpException((exception as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
