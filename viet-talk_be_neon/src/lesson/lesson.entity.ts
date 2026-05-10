import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccountLessonTake } from '../account-lesson/account-lesson-take.entity';

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'lesson_name' })
    lessonName!: string;

    @Column({ nullable: true })
    topic!: string;

    @Column({ nullable: true })
    level!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'lesson_content', type: 'text', nullable: true })
    lessonContent!: string;

    @Column({ type: 'text', nullable: true })
    video!: string;

    @Column({ type: 'text', nullable: true })
    image!: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    rating!: number;

    @OneToMany(() => AccountLessonTake, (alt) => alt.lesson)
    accountTakes!: AccountLessonTake[];
}