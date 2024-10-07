import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule],
  exports: [AuthService]
})
export class AuthModule {}
