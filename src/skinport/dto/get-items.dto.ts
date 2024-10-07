import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class GetItemsDto{
    @ApiProperty({name: 'app_id', required: false, description: 'The app_id for the inventory\'s game (default 730).'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly app_id?: number;
    @ApiProperty({name: 'currency', required: false, description: 'The currency for pricing (default EUR - Supported: AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HRK, NOK, PLN, RUB, SEK, TRY, USD).'})
    @IsOptional()
    readonly currency?: string;
    @ApiProperty({name: 'tradable', required: false, description: 'If true, it shows only tradable items on the market (Default false).'})
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean() 
    readonly tradable?: boolean;
}