import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'userName' })
  userName: string;

  @Column({ type: 'varchar', name: 'passWord' })
  passWord: string;

  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'varchar', name: 'phone' })
  phone: string;

  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
