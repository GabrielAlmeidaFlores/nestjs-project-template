import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/command/retirement-permanent-disability-revision.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionTypeormEntity>
  implements RetirementPermanentDisabilityRevisionCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRevisionTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRevisionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevision(
    entity: RetirementPermanentDisabilityRevisionEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionEntity,
      RetirementPermanentDisabilityRevisionTypeormEntity,
    );
    return this.create(mapped);
  }

  public updateRetirementPermanentDisabilityRevision(
    id: RetirementPermanentDisabilityRevisionId,
    entity: RetirementPermanentDisabilityRevisionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionEntity,
      RetirementPermanentDisabilityRevisionTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
