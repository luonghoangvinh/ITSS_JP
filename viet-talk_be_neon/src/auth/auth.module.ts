import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { AccountsModule } from '../accounts/accounts.module';

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
    ],

    controllers: [AuthController],

    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }