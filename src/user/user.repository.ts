import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findUserDetailsByUsername(firstName: string): Promise<UserEntity> {
    return this.findOneBy({ firstName });
  }
  async saveUser(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('already exists')) {
        throw new ConflictException(
          'Username already exists.',
          'CustomErrorCode',
        ); // Pass the custom error message and code
      }
      throw error;
    }
  }
}
