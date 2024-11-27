import { Body, Controller, Get, Post, Request, Session, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/Local.guard';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}


    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signIn(@Request() req){
        console.log('inside authcontroller signin');
        const user = this.authService.userSignIn(req.body.email, req.body.password);
        return user;
    }

    // auth.controller
    @Post('sign-up')
    @UsePipes(ValidationPipe)
    async signUp(@Body() userData: CreateUsersDto){
        await this.authService.userSignUp(userData);
        console.log('inside singup');
        return { message: 'User created successfully', userData };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('sample')
    async getLogs(@Session() session: Record<string, any>){
        console.log(session);
        console.log(session.id);
        session.authentication = true;
        return session;
    }
}
