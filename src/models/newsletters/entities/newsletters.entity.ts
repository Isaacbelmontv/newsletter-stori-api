import { Users } from 'src/models/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Newsletters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'bytea', nullable: true })
  assetFile: Buffer;

  @Column({ type: 'varchar', nullable: true })
  assetType: string;

  @Column({ type: 'varchar', nullable: true })
  assetName: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Users, (user) => user.newsletters)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
