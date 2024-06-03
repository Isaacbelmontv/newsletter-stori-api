import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../dtos/users.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUsersDto) {
    return this.userRepo.save(data);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //TODO: Use bcrypt to compare passwords
    if (password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
