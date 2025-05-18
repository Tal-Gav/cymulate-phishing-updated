import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Target, TargetSchema } from './schemas/target.schema';

@Module({
  providers: [TargetService],
  controllers: [TargetController],
  imports: [
    MongooseModule.forFeature([{ name: Target.name, schema: TargetSchema }]),
  ],
})
export class TargetModule {}
