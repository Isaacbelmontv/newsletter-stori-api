import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import { NewslettersDelivery } from 'src/models/newsletterDelivery/entities/newsletters-delivery.entity';
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
export class Subscribers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'bool' })
  active: boolean;

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

  @OneToMany(
    () => NewslettersDelivery,
    (newslettersDelivery) => newslettersDelivery.subscriber,
  )
  newslettersDeliveries: NewslettersDelivery;

  @ManyToOne(() => Newsletters, (newsletters) => newsletters.subscribers)
  @JoinColumn({ name: 'newsletters_id' })
  newsletters: Newsletters;
}
