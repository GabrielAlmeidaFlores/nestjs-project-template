import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-result/command/retirement-permanent-disability-rejection-result.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionResultTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRejectionResultTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionResult(
    props: RetirementPermanentDisabilityRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionResultEntity,
      RetirementPermanentDisabilityRejectionResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRejectionResult(
    id: RetirementPermanentDisabilityRejectionResultId,
    props: RetirementPermanentDisabilityRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionResultEntity,
      RetirementPermanentDisabilityRejectionResultTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
