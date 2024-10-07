import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SkinportService } from './skinport.service';
import { GetItemsDto } from './dto/get-items.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkinportHistoryScheme, SkinportItemScheme, SkinportOutOfStockScheme, SkinportTransactionsScheme } from 'src/swagger-scheme/skinport.scheme';
import { GetHistoryDto } from './dto/get-history.dto';
import { GetOutOfStockDto } from './dto/get-out-of-stock.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('SKINPORT')
@Controller('skinport')
export class SkinportController {

    constructor(
        private readonly skinportService: SkinportService,
    ){}

    @ApiOperation({summary: 'Get items from skinport', description: '- Endpoint is cached by 5 minutes.\n - No Authorization required'})
    @ApiOkResponse(SkinportItemScheme)
    @Get('/items')
    public getItems(@Query() dto: GetItemsDto){
        return this.skinportService.getItems(dto.app_id, dto.currency, dto.tradable)
    }
    
    @ApiOperation({summary: 'Get sales history from skinport', description: '- Endpoint is cached by 5 minutes.\n - No Authorization required'})
    @ApiOkResponse(SkinportHistoryScheme)
    @Get('/sales/history')
    public getSalesHistory(@Query() dto: GetHistoryDto){
        return this.skinportService.getHistory(dto.market_hash_name, dto.app_id, dto.currency);
    }

    @ApiOperation({summary: 'Get out of stock items from skinport', description: '- No Authorization required.\n - Cached 1 hour.'})
    @ApiOkResponse(SkinportOutOfStockScheme)
    @Get('/sales/out-of-stock')
    public getOutOfStock(@Query() dto: GetOutOfStockDto){
        return this.skinportService.getOutOfStock(dto.app_id, dto.currency);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get transactions from skinport', description: '- Endpoint is cached by 5 minutes.\n - Authorization required'})
    @ApiOkResponse(SkinportTransactionsScheme)
    @Get('/transactions')
    public getTransactions(@Query() dto: GetTransactionsDto){
        return this.skinportService.getTransactions(dto.page, dto.limit, dto.order);
    }
}
