import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>,
    ) { }

    create(createLessonDto: CreateLessonDto) {
        const newLesson = this.lessonRepository.create(createLessonDto);
        return this.lessonRepository.save(newLesson);
    }

    findAll() {
        return this.lessonRepository.find();
    }

    async findOne(id: number) {
        const lesson = await this.lessonRepository.findOne({ where: { id } });
        if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
        return lesson;
    }

    async update(id: number, updateLessonDto: UpdateLessonDto) {
        const lesson = await this.findOne(id);
        this.lessonRepository.merge(lesson, updateLessonDto);
        return this.lessonRepository.save(lesson);
    }

    async remove(id: number) {
        const lesson = await this.findOne(id);
        return this.lessonRepository.remove(lesson);
    }
}