import { Injectable, Logger } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisService{

    private readonly username: string = process.env.REDIS_USER;
    private readonly password: string = process.env.REDIS_PASSWORD;
    private readonly user_password: string = process.env.REDIS_USER_PASSWORD;
    private readonly host: string = process.env.REDIS_HOST;
    private readonly port: string = process.env.REDIS_PORT;
    private readonly logger: Logger;
    private client: ReturnType<typeof createClient>;

    constructor() {
        this.logger = new Logger(RedisService.name);
        this.connectRedis();
    }

    private async connectRedis(): Promise<void> {
        try {
            const client = createClient({
                url: `redis://${this.username}:${this.user_password}@${this.host}:${this.port}`,
            });

            await client.connect();
            this.client = client; 
            this.logger.log('Connected to Redis');
        } catch (error) {
            this.logger.error('Error connecting to Redis:', error);
        }
    }

    public async set(key: string, value: string, expire?: number){
        await this.client.set(key, value);
        if(expire){
            await this.client.expire(key, expire);
        }
    }

    public async get(key: string){
        return await this.client.get(key)
    }

    public async getSet(key: string, value: string){
        await this.client.getSet(key, value);
    }

    public async del(key: string){
        await this.client.del(key);
    }

    public async rename(oldKey: string, newKey: string){
        await this.client.rename(oldKey, newKey);
    }

    public async exists(key: string){
        return await this.client.exists(key);
    }

    public async getKeys(pattern: string){
        return await this.client.keys(pattern);
    }

    public async ttl(key: string){
        return await this.client.ttl(key);
    }

}
