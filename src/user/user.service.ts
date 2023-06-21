import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

export type User = any;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findUserDetailsByUsername(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
}
