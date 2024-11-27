import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE')
        private readonly userService: UsersService,
    ){}

    async userSignIn(email: string, pass: string){
        console.log('inside authservice');
        const userDB = await this.userService.findUserByEmail(email);
        if(userDB) {
            const isPasswordValid = comparePasswords(pass, userDB.password);
            if(isPasswordValid) {
                console.log(userDB, 'User validation successful!');
                return userDB;
            }
            else{
                console.log('Password is not valid');
                throw new UnauthorizedException('Invalid password');
            }
        }
        console.log('User validation failed!');
        throw new UnauthorizedException('Invalid email or password');        
    }

    // auth.service
    async userSignUp(createUserDto: CreateUsersDto){
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return newUser;
        }
        catch (error) { 
            console.error('Error in createsignup:', error); 
            throw error;
        }
    }
}
