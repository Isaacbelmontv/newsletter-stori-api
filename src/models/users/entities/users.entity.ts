import { NewslettersDelivery } from '@models/newsletterDelivery/entities/newsletters-delivery.entity';
import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

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

  @OneToMany(() => Newsletters, (newsletters) => newsletters.user, {
    nullable: true,
  })
  newsletters: Newsletters[];

  @OneToMany(
    () => NewslettersDelivery,
    (newslettersDelivery) => newslettersDelivery.user,
    { nullable: true },
  )
  newslettersDeliveries: NewslettersDelivery[];
}
