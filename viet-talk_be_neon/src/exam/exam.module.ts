import { Module } from '@nestjs/common';
import { ExamsController } from './exam.controller';
import { ExamsService } from './exam.service';
import { AccountExamTake } from '../account-exam-take/account-exam-take.entity';
import { Question } from '../question/question.entity';
import { Exam } from './exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Exam, Question, AccountExamTake]),],
  controllers: [ExamsController],
  providers: [ExamsService]
})
export class ExamModule {}
