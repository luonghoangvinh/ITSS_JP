import { Module } from '@nestjs/common';
import { QuestionsController } from './question.controller';
import { QuestionsService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionModule {}
