import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
