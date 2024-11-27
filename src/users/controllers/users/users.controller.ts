import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard, AuthorisationGuard } from 'src/auth/utils/Local.guard';
import { UpdateQuotesDto } from 'src/quotes/dto/UpdateQuotes.dto';
import { CreateUsersDto } from 'src/users/dto/CreateUsers.dto';
import { UpdateUsersDto } from 'src/users/dto/UpdateUsers.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getUsers(@Req() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard, AuthorisationGuard)
    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateQuote(
        @Param('id') id: string,
        @Body() userData: UpdateUsersDto
    ){
        const updatedUser = await this.usersService.updateUser(id, userData);
        return { message: 'User updated successfully', updatedUser };
    }

    @UseGuards(AuthenticatedGuard, AuthorisationGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        await this.usersService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }

    
}
