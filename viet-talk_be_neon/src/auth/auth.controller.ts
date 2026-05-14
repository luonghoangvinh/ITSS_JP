import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAccountDto } from '../accounts/dto/create-account.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    login(@Body() body: any) {
        return this.authService.login(
            body.username,
            body.password,
        );
    }

    @Post('signup')
    signup(@Body() createAccountDto: CreateAccountDto) {
        return this.authService.signup(createAccountDto);
    }
}