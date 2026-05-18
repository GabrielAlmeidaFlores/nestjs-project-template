import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

@Injectable()
export class MiniAdvisorTypeormCommandRepository
  extends BaseTypeormCommandRepository<MiniAdvisorTypeormEntity>
  implements MiniAdvisorCommandRepositoryGateway
{
  protected readonly _type = MiniAdvisorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MiniAdvisorTypeormEntity)
    repository: Repository<MiniAdvisorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMiniAdvisor(props: MiniAdvisorEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MiniAdvisorEntity,
      MiniAdvisorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMiniAdvisor(
    id: MiniAdvisorId,
    props: MiniAdvisorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MiniAdvisorEntity,
      MiniAdvisorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteMiniAdvisor(id: MiniAdvisorId): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
    });
  }
}
