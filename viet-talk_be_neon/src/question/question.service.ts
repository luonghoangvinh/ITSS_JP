import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,
    ) { }

    create(createQuestionDto: CreateQuestionDto) {
        const newQuestion = this.questionRepo.create(createQuestionDto);
        return this.questionRepo.save(newQuestion);
    }

    findAll() {
        return this.questionRepo.find();
    }

    async findOne(id: number) {
        const question = await this.questionRepo.findOne({ where: { id } });
        if (!question) throw new NotFoundException(`Question #${id} not found`);
        return question;
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
        const question = await this.findOne(id);
        this.questionRepo.merge(question, updateQuestionDto);
        return this.questionRepo.save(question);
    }

    async remove(id: number) {
        const question = await this.findOne(id);
        return this.questionRepo.remove(question);
    }
}