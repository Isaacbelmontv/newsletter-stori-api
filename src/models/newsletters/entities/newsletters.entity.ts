import { NewslettersDelivery } from '@models/newsletterDelivery/entities/newsletters-delivery.entity';
import { Subscribers } from '@models/subscribers/entities/subscribers.entity';
import { Users } from 'src/models/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Users, (user) => user.newsletters, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(
    () => NewslettersDelivery,
    (newslettersDelivery) => newslettersDelivery.newsletters,
    { nullable: true },
  )
  newslettersDeliveries: NewslettersDelivery;

  @OneToMany(() => Subscribers, (subscribers) => subscribers.newsletters, {
    nullable: true,
  })
  subscribers: Subscribers;
}
