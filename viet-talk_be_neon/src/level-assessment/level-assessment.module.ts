import { Module } from '@nestjs/common';
import { LevelAssessmentController } from './level-assessment.controller';
import { LevelAssessmentService } from './level-assessment.service';

@Module({
  providers: [LevelAssessmentService],
  controllers: [LevelAssessmentController],
})
export class LevelAssessmentModule {}
