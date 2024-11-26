import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateQuotesDto } from 'src/quotes/dtos/UpdateQuotes.dto';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';
import { UpdateUsersDto } from 'src/users/dto/UpdateUsers.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateQuote(
        @Param('id', ParseIntPipe) id: number,
        @Body() userData: UpdateUsersDto
    ){
        const updatedUser = await this.usersService.updateUser(id, userData);
        return { message: 'User updated successfully', updatedUser };
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        await this.usersService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createUser(@Body() userData: CreateUsersDto){
    //     this.usersService.userSignUp(userData);
    //     return { message: 'User created successfully', userData };
    // }
}
