import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
