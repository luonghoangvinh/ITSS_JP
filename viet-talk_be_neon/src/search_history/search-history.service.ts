import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchHistory } from './search-history.entity';
import { CreateSearchHistoryDto } from './dto/create-search-history.dto';
import { UpdateSearchHistoryDto } from './dto/update-search-history.dto';

@Injectable()
export class SearchHistoryService {
    constructor(
        @InjectRepository(SearchHistory)
        private searchHistoryRepo: Repository<SearchHistory>,
    ) { }

    create(createDto: CreateSearchHistoryDto) {
        const newSearch = this.searchHistoryRepo.create(createDto);
        return this.searchHistoryRepo.save(newSearch);
    }

    // Lấy toàn bộ lịch sử (thường lấy theo accountId)
    findByAccount(accountId: number) {
        return this.searchHistoryRepo.find({ where: { accountId }, order: { id: 'DESC' } });
    }

    async remove(id: number) {
        const search = await this.searchHistoryRepo.findOne({ where: { id } });
        if (!search) throw new NotFoundException('Search history not found');
        return this.searchHistoryRepo.remove(search);
    }
}