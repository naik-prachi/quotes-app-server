import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Get()
    authGet(){
        return 'Auth Get';
    }

    @UseGuards(AuthGuard('local'))
    @Post('sign-in')
    async signIn(@Request() req){
        return 'Sign in';
    }
}
