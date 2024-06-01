import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';
import { Users } from '../models/users/entities/users.entity';
import { Subscribers } from 'src/models/subscribers/entities/subscribers.entity';
import { Newsletters } from 'src/models/newsletters/entities/newsletters.entity';

const API_KEY = '123456';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Subscribers, Newsletters]),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false, //false for run migrations
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
