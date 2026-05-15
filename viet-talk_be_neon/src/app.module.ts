import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AccountsModule } from './accounts/accounts.module';
import { LessonModule } from './lesson/lesson.module';
import { AccountExamTake } from './account-exam-take/account-exam-take.entity';
import { AccountLessonTake } from './account-lesson/account-lesson-take.entity';
import { SearchHistory } from './search_history/search-history.entity';
import { Lesson } from './lesson/lesson.entity';
import { Account } from './accounts/account.entity';
import { Exam } from './exam/exam.entity';
import { Question } from './question/question.entity';
import { SearchHistoryModule } from './search_history/search-history.module';
import { QuestionModule } from './question/question.module';
import { ExamModule } from './exam/exam.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        url: configService.get<string>('DATABASE_URL'),

        autoLoadEntities: true,

        synchronize: false,

        //thêm toàn bộ entity vào đây để tránh lỗi "EntityMetadataNotFoundError: No metadata for ... was found."
        entities: [
          Account,
          Lesson,
          Exam,
          Question,
          SearchHistory,
          AccountLessonTake,
          AccountExamTake,
        ],
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    AccountsModule,

    LessonModule,

    SearchHistoryModule,

    QuestionModule,

    ExamModule,
    
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
