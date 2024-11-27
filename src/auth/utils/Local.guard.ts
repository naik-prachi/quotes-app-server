import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()

// document recommended to create a custom authguard class
// and extend that class to AUthGaurd
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext){
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
}

export class AuthorisationGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        const userId = req.Param.id;
        if (userId === user.id)
            return true;
        throw new UnauthorizedException('You can modify only your data');
    }
}