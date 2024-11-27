import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/Local.strategy';
import { SessionSerializer } from './utils/Session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule],
  controllers: [AuthController],
  providers: [
    UsersService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    AuthService,
    SessionSerializer,
  ],
  exports: [AuthService],
})

export class AuthModule {}
