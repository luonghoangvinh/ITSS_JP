import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { AccountLessonTake } from '../account-lesson/account-lesson-take.entity';
import { SearchHistory } from '../search_history/search-history.entity';
import { AccountExamTake } from '../account-exam-take/account-exam-take.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'full_name', nullable: true })
    fullName!: string;

    @Column({ name: 'user_name', unique: true })
    userName!: string;

    @Column({ nullable: true })
    role!: string;

    @Column({ nullable: true })
    introduction?: string;

    @Column({ unique: true })
    gmail!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    image?: string;

    @Column({
        name: 'last_password_change',
        type: 'timestamp',
        nullable: true,
    })
    lastPasswordChange?: Date;

    // Relationships
    @OneToMany(() => SearchHistory, (search) => search.account)
    searches?: SearchHistory[];

    @OneToMany(() => AccountLessonTake, (alt) => alt.account)
    lessonTakes?: AccountLessonTake[];

    @OneToMany(() => AccountExamTake, (aet) => aet.account)
    examTakes?: AccountExamTake[];
}