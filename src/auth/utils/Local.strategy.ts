import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject('AUTH_SERVICE') 
        private readonly authService: AuthService,
    ){
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string){
        console.log(email);
        console.log(password);
        const user = this.authService.userSignIn(email, password);
        if (user){
            console.log("user validated");
            return user;
        }

        throw new UnauthorizedException();
    }
}