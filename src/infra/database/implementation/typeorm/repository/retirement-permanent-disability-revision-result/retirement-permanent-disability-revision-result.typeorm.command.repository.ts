import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/command/retirement-permanent-disability-revision-result.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionResultTypeormEntity>
  implements RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRevisionResultTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRevisionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionResult(
    props: RetirementPermanentDisabilityRevisionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionResultEntity,
      RetirementPermanentDisabilityRevisionResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRevisionResult(
    id: RetirementPermanentDisabilityRevisionResultId,
    props: RetirementPermanentDisabilityRevisionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionResultEntity,
      RetirementPermanentDisabilityRevisionResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
