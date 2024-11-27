import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Users } from "src/typeorm";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer{
    constructor(
        @Inject('USER_SERVICE')
        private readonly usersService: UsersService
    ){
        super();
    }

    serializeUser(user: Users, done: (err, user:Users) => void) {
        console.log('serialise user');
        done(null, user);
    }

    async deserializeUser(user: Users, done: (err: any, user: Users ) => void) {
        console.log('deserialise user');
        const userDB = await this.usersService.findUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null as any);
    }
}