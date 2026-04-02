import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SystemLogTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-log.typeorm.entity';
import { SystemLogCommandGateway } from '@shared/system/system-log/system-log.command.gateway';

@Injectable()
export class SystemLogTypeormCommandRepository extends SystemLogCommandGateway {
  protected override readonly _type = SystemLogTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SystemLogTypeormEntity)
    private readonly repository: Repository<SystemLogTypeormEntity>,
  ) {
    super();
  }

  public override async persist(props: {
    code: number;
    endpoint: string;
    stackTrace: string | null;
    isError: boolean;
    requestBody: string | null;
    responseBody: string | null;
  }): Promise<void> {
    const row = this.repository.create({
      code: props.code,
      endpoint: props.endpoint,
      stackTrace: props.stackTrace,
      isError: props.isError,
      requestBody: props.requestBody,
      responseBody: props.responseBody,
    });

    await this.repository.save(row);
  }
}
