import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@Entity({ name: 'system_logs' })
export class SystemLogTypeormEntity extends BaseBuildableObject {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'code', type: 'int' })
  public code: number;

  @Column({ name: 'endpoint', type: 'varchar', length: 500 })
  public endpoint: string;

  @CreateDateColumn({ name: 'data', transformer: DateTransformer })
  public data: Date;

  @Column({ name: 'stack_trace', type: 'text', nullable: true })
  public stackTrace: string | null;

  @Column({ name: 'request_body', type: 'longtext', nullable: true })
  public requestBody: string | null;

  @Column({ name: 'response_body', type: 'longtext', nullable: true })
  public responseBody: string | null;

  @Column({ name: 'is_error', type: 'boolean' })
  public isError: boolean;

  protected override readonly _type = SystemLogTypeormEntity.name;
}
