import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AccountsService } from '../accounts/accounts.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,

        private readonly jwtService: JwtService,
    ) { }

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

        /*const isMatch = await bcrypt.compare(
            password,
            account.password,
        );*/
        const isMatch =
            password === account.password;

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