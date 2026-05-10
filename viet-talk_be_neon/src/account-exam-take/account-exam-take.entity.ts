import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Exam } from '../exam/exam.entity';

@Entity('account_exam_takes')
export class AccountExamTake {
    @PrimaryColumn({ name: 'account_id' })
    accountId!: number;

    @PrimaryColumn({ name: 'exam_id' })
    examId!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    score!: number;

    @Column({ name: 'number_of_questions', nullable: true })
    numberOfQuestions!: number;

    @Column({ name: 'latest_completion_time', type: 'timestamp', nullable: true })
    latestCompletionTime!: Date;

    @ManyToOne(() => Account, (account) => account.examTakes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: Account;

    @ManyToOne(() => Exam, (exam) => exam.accountTakes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exam_id' })
    exam!: Exam;
}