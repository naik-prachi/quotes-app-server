import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as UserEntity } from 'src/typeorm';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { UpdateUsersDto } from 'src/users/dto/UpdateUsers.dto';
import { Users } from 'src/users/types/Users';
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

    async updateUser(id: number, updateUserDto: UpdateUsersDto){
        const user = await this.usersRepository.findOne({ where: { id } });
        if(user){
            const updatedUser = this.usersRepository.merge(user, updateUserDto);
            return await this.usersRepository.save(updatedUser);
        }
    }

    async deleteUser(id: number){
        const user = await this.usersRepository.delete(id);
        if(user.affected === 0) 
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }


    // to be used in authentication
    findUserByEmail(email: string){
        console.log('inside findByUsername');
        return this.usersRepository.findOne({ where: { email } });
    }
}
