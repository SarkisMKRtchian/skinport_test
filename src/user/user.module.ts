import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { ApiKeysModel } from './models/api-keys.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    SequelizeModule.forFeature([UserModel, ApiKeysModel])
  ]
})
export class UserModule {}
