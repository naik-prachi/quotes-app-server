import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Get()
    authGet(){
        return 'Auth Get';
    }

    // @UseGuards(AuthGuard('local'))
    @Post('sign-in')
    async signIn(@Request() req){
        console.log('inside authcontroller signin');
        const user = this.authService.signIn(req.body.email, req.body.password);
        // console.log(user);
        // return this.authService.signIn(req.user.email, req.user.password);
        return user;
    }
}
