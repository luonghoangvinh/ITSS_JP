import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { Question } from '../question/question.entity';
import { AccountExamTake } from '../account-exam-take/account-exam-take.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
    constructor(
        @InjectRepository(Exam)
        private examRepo: Repository<Exam>,
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,
        @InjectRepository(AccountExamTake)
        private accountExamTakeRepo: Repository<AccountExamTake>,
    ) { }

    // CRUD Bài thi
    create(createExamDto: CreateExamDto) {
        const exam = this.examRepo.create(createExamDto);
        return this.examRepo.save(exam);
    }

    findAll() {
        return this.examRepo.find({ relations: ['questions'] });
    }

    async findOne(id: number) {
        const exam = await this.examRepo.findOne({
            where: { id },
            relations: ['questions'],
        });
        if (!exam) throw new NotFoundException(`Exam #${id} không tồn tại`);
        return exam;
    }

    async update(id: number, updateExamDto: UpdateExamDto) {
        const exam = await this.findOne(id);
        this.examRepo.merge(exam, updateExamDto);
        return this.examRepo.save(exam);
    }

    async remove(id: number) {
        const exam = await this.findOne(id);
        return this.examRepo.remove(exam);
    }

    // Quản lý câu hỏi trong đề (ManyToMany)
    async addQuestionToExam(examId: number, questionId: number) {
        const exam = await this.findOne(examId);
        const question = await this.questionRepo.findOne({ where: { id: questionId } });

        if (!question) throw new NotFoundException('Câu hỏi không tồn tại');

        if (!exam.questions.some((q) => q.id === questionId)) {
            exam.questions.push(question);
            return this.examRepo.save(exam);
        }
        return exam;
    }

    async removeQuestionFromExam(examId: number, questionId: number) {
        const exam = await this.findOne(examId);
        exam.questions = exam.questions.filter((q) => q.id !== questionId);
        return this.examRepo.save(exam);
    }

    // Lưu kết quả thi của người dùng
    async saveExamResult(accountId: number, examId: number, score: number, num: number) {
        let result = await this.accountExamTakeRepo.findOne({
            where: { accountId, examId },
        });

        if (!result) {
            result = this.accountExamTakeRepo.create({
                accountId,
                examId,
                score,
                numberOfQuestions: num,
                latestCompletionTime: new Date(),
            });
        } else {
            result.score = score;
            result.numberOfQuestions = num;
            result.latestCompletionTime = new Date();
        }

        return this.accountExamTakeRepo.save(result);
    }
}