import { Module } from '@nestjs/common';
import { SkinportService } from './skinport.service';
import { RedisModule } from 'src/redis/redis.module';
import { SkinportController } from './skinport.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [SkinportService],
  imports: [RedisModule, UserModule],
  controllers: [SkinportController]
})
export class SkinportModule {}
