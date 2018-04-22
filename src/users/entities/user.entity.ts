import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { Analyst } from '../../forms/analysts/entities/analyst.entity';

@Entity({ name: 'users' })
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  username: string;

  @Column({ length: 64, nullable: false })
  password: string;

  @Column({ length: 254, nullable: false })
  email: string;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column('timestamp with time zone', { name: 'create_date', nullable: false })
  createDate: Date;

  @Column('timestamp with time zone', { name: 'last_update_date' })
  lastUpdateDate?: Date;

  @OneToMany(type => Analyst, analyst => analyst)
  analysts: Analyst[];
}
