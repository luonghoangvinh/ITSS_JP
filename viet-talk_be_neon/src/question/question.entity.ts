import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Exam } from '../exam/exam.entity';

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text' })
    answer!: string;

    @Column({ name: 'four_answers', type: 'jsonb', nullable: true })
    fourAnswers!: string[];

    @ManyToMany(() => Exam, (exam) => exam.questions)
    exams!: Exam[];
}