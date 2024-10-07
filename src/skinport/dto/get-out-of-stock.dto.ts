import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetOutOfStockDto{
    @ApiProperty({name: 'app_id', required: false, example: 730, description: 'The app_id for the inventory\'s game (default 730).'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly app_id?: number;
    @ApiProperty({name: 'currency', required: false, example: 'USD', description: 'The currency for pricing (default EUR - Supported: AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HRK, NOK, PLN, RUB, SEK, TRY, USD).'})
    @IsOptional()
    @Type(() => String)
    readonly currency?: string;
}