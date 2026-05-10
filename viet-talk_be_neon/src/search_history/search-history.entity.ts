import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account }from '../accounts/account.entity';

@Entity('search_history')
export class SearchHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'account_id' })
    accountId!: number;

    @Column()
    word!: string;

    @Column({ type: 'text', nullable: true })
    translation!: string;

    @ManyToOne(() => Account, (account) => account.searches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: Account;
}