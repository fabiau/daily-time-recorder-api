import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, TableForeignKey, JoinColumn, Unique } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity({ name: 'analysts' })
@Unique([ 'email', 'userId' ])
export class Analyst {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 254, nullable: false })
  email: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(type => User, user => user.analysts, { })
  @JoinColumn({ name: 'user_id' })
  user: User;
}