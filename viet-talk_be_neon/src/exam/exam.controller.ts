import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';

@Controller('exams')
export class ExamsController {
    constructor(private readonly examsService: ExamsService) { }

    @Post()
    create(@Body() createExamDto: CreateExamDto) {
        return this.examsService.create(createExamDto);
    }

    @Get()
    findAll() {
        return this.examsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
        return this.examsService.update(+id, updateExamDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examsService.remove(+id);
    }

    // Quản lý câu hỏi trong đề
    @Post(':examId/questions/:questionId')
    addQuestion(@Param('examId') examId: string, @Param('questionId') questionId: string) {
        return this.examsService.addQuestionToExam(+examId, +questionId);
    }

    @Delete(':examId/questions/:questionId')
    removeQuestion(@Param('examId') examId: string, @Param('questionId') questionId: string) {
        return this.examsService.removeQuestionFromExam(+examId, +questionId);
    }

    // Lưu điểm/Nộp bài
    @Post(':examId/submit')
    submitExam(
        @Param('examId') examId: string,
        @Body() submitDto: SubmitExamDto,
    ) {
        return this.examsService.saveExamResult(
            submitDto.accountId,
            +examId,
            submitDto.score,
            submitDto.numberOfQuestions,
        );
    }
}