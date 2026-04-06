import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MiniAdvisorResultCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/command/mini-advisor-result.command.repository.gateway';
import { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

@Injectable()
export class MiniAdvisorResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<MiniAdvisorResultTypeormEntity>
  implements MiniAdvisorResultCommandRepositoryGateway
{
  protected readonly _type = MiniAdvisorResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MiniAdvisorResultTypeormEntity)
    repository: Repository<MiniAdvisorResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMiniAdvisorResult(
    props: MiniAdvisorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MiniAdvisorResultEntity,
      MiniAdvisorResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteMiniAdvisorResult(id: MiniAdvisorResultId): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
    });
  }
}
