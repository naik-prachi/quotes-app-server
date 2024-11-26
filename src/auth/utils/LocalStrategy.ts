import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: AuthService,
    ){
        super();
    }

    async validate(email: string, password: string){
        this.authService.signIn(email, password);
    }
}