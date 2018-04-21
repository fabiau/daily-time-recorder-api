import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 64 })
  password: string;

  @Column({ length: 254 })
  email: string;

  @Column({ name: 'first_name', length: 254 })
  firstName: string;

  @Column({ name: 'last_name', length: 254 })
  lastName: string;

  @Column('timestamp with time zone', { name: 'create_date' })
  createDate: Date;

  @Column('timestamp with time zone', { name: 'last_update_date' })
  lastUpdateDate?: Date;
}
