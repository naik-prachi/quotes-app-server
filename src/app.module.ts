import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';

@Module({
  imports: [QuotesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',

    username: 'root',
    password: '',
    database: 'quotes-app',
    entities: entities,
    synchronize: true,  // false during production
  }), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
