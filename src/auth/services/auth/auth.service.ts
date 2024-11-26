import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE')
        private readonly userService: UsersService,
    ){}

    async signIn(email: string, pass: string){
        console.log('inside authservice');
        const userDB = await this.userService.findUserByEmail(email);
        if(userDB?.password !== pass) {
           throw new UnauthorizedException();
        }

        const { password, ...result } = userDB;
        return result;
    }
}
