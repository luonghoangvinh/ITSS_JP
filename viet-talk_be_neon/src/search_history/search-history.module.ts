import { Module } from '@nestjs/common';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import { SearchHistory } from './search-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([SearchHistory])],
    controllers: [SearchHistoryController],
    providers: [SearchHistoryService],
})
export class SearchHistoryModule {}
