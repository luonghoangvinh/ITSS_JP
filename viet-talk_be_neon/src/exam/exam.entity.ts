import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AccountExamTake } from '../account-exam-take/account-exam-take.entity';
import { Question } from '../question/question.entity';

@Entity('exams')
export class Exam {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'text', nullable: true })
    video!: string;

    @OneToMany(() => AccountExamTake, (aet) => aet.exam)
    accountTakes!: AccountExamTake[];

    @ManyToMany(() => Question, (question) => question.exams)
    @JoinTable({
        name: 'exam_questions',
        joinColumn: { name: 'exam_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'question_id', referencedColumnName: 'id' },
    })
    questions!: Question[];
}