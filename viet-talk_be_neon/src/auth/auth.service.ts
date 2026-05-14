import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AccountsService } from '../accounts/accounts.service';
import { CreateAccountDto } from '../accounts/dto/create-account.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,

        private readonly jwtService: JwtService,
    ) { }

    async signup(createAccountDto: CreateAccountDto) {
        const { userName, gmail, password } = createAccountDto;

        if (!userName || !gmail || !password) {
            throw new BadRequestException(
                'Username, email, and password are required',
            );
        }

        const existingUser = await this.accountService.findByUsername(userName);
        const existingEmail = await this.accountService.findByEmail(gmail);

        if (existingUser || existingEmail) {
            throw new ConflictException(
                'Username or email already exists',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await this.accountService.create({
            ...createAccountDto,
            password: hashedPassword,
        });

        const payload = {
            sub: account.id,
            username: account.userName,
            role: account.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(
        username: string,
        password: string,
    ) {
        const account =
            await this.accountService.findByUsername(
                username,
            );

        if (!account) {
            throw new UnauthorizedException(
                'Account not found',
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            account.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException(
                'Wrong password',
            );
        }

        const payload = {
            sub: account.id,
            username: account.userName,
            role: account.role,
        };

        return {
            access_token:
                this.jwtService.sign(payload),
        };
    }
}