import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../accounts/account.entity';

@Module({
    imports: [
        AccountsModule,

        PassportModule,

        JwtModule.register({
            secret: 'MY_SECRET_KEY',
            signOptions: {
                expiresIn: '1d',
            },
        }),
        TypeOrmModule.forFeature([Account])
    ],

    controllers: [AuthController],

    providers: [AuthService, JwtStrategy,AccountsService],
})
export class AuthModule { }