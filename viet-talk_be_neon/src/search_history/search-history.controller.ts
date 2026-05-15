import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';
import { CreateSearchHistoryDto } from './dto/create-search-history.dto';

@Controller('search-history')
export class SearchHistoryController {
    constructor(private readonly searchHistoryService: SearchHistoryService) { }

    @Post()
    create(@Body() createSearchHistoryDto: CreateSearchHistoryDto) {
        return this.searchHistoryService.create(createSearchHistoryDto);
    }

    @Get('account/:accountId')
    findByAccount(@Param('accountId') accountId: string) {
        return this.searchHistoryService.findByAccount(+accountId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.searchHistoryService.remove(+id);
    }
}