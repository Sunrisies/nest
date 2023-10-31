import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'userName' })
  userName: string;

  @Column({ type: 'varchar', name: 'passWord' })
  passWord: string;
}
