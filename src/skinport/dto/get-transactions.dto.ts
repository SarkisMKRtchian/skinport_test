import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { SkinportTransactionSortOrderEnum } from "../skinport.types";

export class GetTransactionsDto{
    @ApiProperty({name: 'page', required: false, example: 1, description: 'Pagination Page (default 1).'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly page: number;
    @ApiProperty({name: 'limit', required: false, example: 10, description: 'Limit results between 1 and 100 (default 100).'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly limit: number;
    @ApiProperty({name: 'order', required: false, enum: SkinportTransactionSortOrderEnum, example: SkinportTransactionSortOrderEnum.ASC, description: 'Order results by asc or desc (default desc).'})
    @IsOptional()
    @IsEnum(SkinportTransactionSortOrderEnum)
    readonly order: SkinportTransactionSortOrderEnum;
}