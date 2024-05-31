import { NewslettersDelivery } from 'src/models/newsletterDelivery/entities/newsletters-delivery.entity';
import { Newsletters } from 'src/models/newsletters/entities/newsletters.entity';
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

  @OneToMany(() => Newsletters, (newsletters) => newsletters.user)
  newsletters: Newsletters[];

  @OneToMany(
    () => NewslettersDelivery,
    (newslettersDelivery) => newslettersDelivery.user,
  )
  newslettersDeliveries: NewslettersDelivery[];
}
