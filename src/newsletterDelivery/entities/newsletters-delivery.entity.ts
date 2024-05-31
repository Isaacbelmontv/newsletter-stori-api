import { Newsletters } from 'src/newsletters/entities/newsletters.entity';
import { Subscribers } from 'src/subscribers/entities/subscribers.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Subscribers, (subscriber) => subscriber.deliveries)
  @JoinTable({
    name: 'subscribers_deliveries',
    joinColumn: { name: 'delivery_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subscriber_id', referencedColumnName: 'id' },
  })
  subscriber: Subscribers[];

  @ManyToMany(() => Newsletters)
  @JoinTable({
    name: 'newsletters_deliveries',
    joinColumn: { name: 'delivery_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'newsletter_id', referencedColumnName: 'id' },
  })
  newsletter: Newsletters[];
}
