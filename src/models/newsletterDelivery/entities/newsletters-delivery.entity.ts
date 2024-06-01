import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import { Subscribers } from '@models/subscribers/entities/subscribers.entity';
import { Users } from '@models/users/entities/users.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class NewslettersDelivery {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Users, (user) => user.newslettersDeliveries)
  user: Users;

  @ManyToOne(
    () => Subscribers,
    (subscriber) => subscriber.newslettersDeliveries,
  )
  subscriber: Subscribers;

  @ManyToOne(
    () => Newsletters,
    (newsletters) => newsletters.newslettersDeliveries,
  )
  newsletters: Newsletters;
}
