import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    ) {}

  // CREATE
    async create(
    createAccountDto: CreateAccountDto,
    ): Promise<Account> {
    const account = this.accountRepository.create(
        createAccountDto,
    );

    return await this.accountRepository.save(account);
    }

  // READ ALL
    async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
    }

  // READ ONE
    async findOne(id: number): Promise<Account | null> {
    return await this.accountRepository.findOne({
        where: { id },
    });
    }

  // UPDATE
    async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
    ): Promise<Account | null> {
    await this.accountRepository.update(
        id,
        updateAccountDto,
    );

    return this.findOne(id);
    }

  // DELETE
    async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
    }
}