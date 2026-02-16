import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export abstract class BaseTypeormEntity extends BaseBuildableObject {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at', transformer: DateTransformer })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', transformer: DateTransformer })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', transformer: DateTransformer })
  public deletedAt: Date | null;
}
