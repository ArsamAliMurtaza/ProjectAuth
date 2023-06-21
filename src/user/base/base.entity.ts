import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class EntityBase {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt!: Date;

  constructor(entityBase?: Partial<EntityBase>) {
    if (entityBase) {
      Object.assign(this, entityBase);
    }
  }
}

export { EntityBase };
