import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserQuoteReactionModule } from './user-quote-reaction/user-quote-reaction.module';
import entities from './typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [QuotesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'quotes-app',
    entities: entities,
    synchronize: true,  // false during production
  }), UsersModule, AuthModule, UserQuoteReactionModule,
  PassportModule.register(
    {
      session: true,
    }
  )
],
  controllers: [],
  providers: [],
})
export class AppModule {}
