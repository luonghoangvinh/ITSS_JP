import { Body, Controller, Get, Patch } from '@nestjs/common';
import { LevelAssessmentService } from './level-assessment.service';

@Controller('level-assessment')
export class LevelAssessmentController {
  constructor(private readonly levelAssessmentService: LevelAssessmentService) {}

  @Get()
  getAssessmentOverview() {
    return this.levelAssessmentService.getOverview();
  }

  @Patch('speed')
  updateSpeed(@Body('speed') speed: number) {
    return this.levelAssessmentService.updateAudioSpeed(speed);
  }
}
