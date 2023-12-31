import { EntityBase } from 'src/user/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends EntityBase {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  refreshToken: string;
}
