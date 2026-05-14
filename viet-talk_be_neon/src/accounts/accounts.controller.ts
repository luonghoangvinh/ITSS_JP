import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Req,
    Request,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
    constructor(
        private readonly accountsService: AccountsService,
    ) { }

    // CREATE
    @Post()
    create(
        @Body() createAccountDto: CreateAccountDto,
    ) {
        return this.accountsService.create(
            createAccountDto,
        );
    }

    // READ ALL
    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    // READ ONE
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.accountsService.findOne(
            Number(id),
        );
    }

    // UPDATE
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateAccountDto: UpdateAccountDto,
    ) {
        return this.accountsService.update(
            Number(id),
            updateAccountDto,
        );
    }

    // DELETE
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accountsService.remove(
            Number(id),
        );
    }
}