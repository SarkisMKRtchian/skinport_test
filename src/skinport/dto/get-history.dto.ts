import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsInt, IsNotEmpty } from "class-validator";

export class GetHistoryDto{
    @ApiProperty({name: 'market_hash_name', required: true, description: 'The item\'s names, comma-delimited.'})
    @IsNotEmpty()
    readonly market_hash_name: string;
    @ApiProperty({name: 'app_id', required: false, description: 'The app_id for the inventory\'s game (default 730).'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly app_id?: number;
    @ApiProperty({name: 'currency', required: false, description: 'The currency for pricing (default EUR - Supported: AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HRK, NOK, PLN, RUB, SEK, TRY, USD).'})
    @IsOptional()
    readonly currency?: string;
}