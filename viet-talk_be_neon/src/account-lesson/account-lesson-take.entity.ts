import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Lesson } from '../lesson/lesson.entity';

@Entity('account_lesson_takes')
export class AccountLessonTake {
    @PrimaryColumn({ name: 'account_id' })
    accountId!: number;

    @PrimaryColumn({ name: 'lesson_id' })
    lessonId!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    progress!: number;

    @Column({ name: 'latest_completion_time', type: 'timestamp', nullable: true })
    latestCompletionTime!: Date;

    @ManyToOne(() => Account, (account) => account.lessonTakes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: Account;

    @ManyToOne(() => Lesson, (lesson) => lesson.accountTakes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lesson_id' })
    lesson!: Lesson;
}