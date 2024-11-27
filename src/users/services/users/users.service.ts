import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as UserEntity } from 'src/typeorm';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { UpdateUsersDto } from 'src/users/dto/UpdateUsers.dto';
import { Users } from 'src/users/types/Users';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ){}

    private users: Users[] = []

    // get details of the logged-in user
    getUsers(){
        return this.usersRepository.find();
    }

    async updateUser(id: string, updateUserDto: UpdateUsersDto){
        const user = await this.usersRepository.findOne({ where: { id } });
        if(user){
            const pass = encodePassword(updateUserDto.password);
            // console.log('hashpass: ', pass);
            console.log(updateUserDto);
            const updatedUserData = this.usersRepository.create({
                ...updateUserDto, 
                password: pass 
            });
            const updatedUser = this.usersRepository.merge(user, updatedUserData);
            return await this.usersRepository.save(updatedUser);
        }
    }

    async deleteUser(id: string){
        const user = await this.usersRepository.delete(id);
        if(user.affected === 0) 
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }


    // to be used in authentication
    findUserByEmail(email: string){
        console.log('inside findByUsername');
        return this.usersRepository.findOne({ where: { email } });
    }

    // users.service
    createUser(@Body() userData: CreateUsersDto){
        const pass = encodePassword(userData.password);
        console.log('hashpass: ', pass);
        console.log(userData);
        const newUser = this.usersRepository.create({
            ...userData, 
            password: pass 
        });
        return this.usersRepository.save(newUser);  
    }

    findUserById(id: string){
        return this.usersRepository.findOne({ where: { id } })
    }
}
