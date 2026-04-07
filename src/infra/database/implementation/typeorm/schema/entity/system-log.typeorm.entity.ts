import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'system_logs' })
export class SystemLogTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'code', type: 'int' })
  public code: number;

  @Column({ name: 'endpoint', type: 'varchar', length: 500 })
  public endpoint: string;

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
