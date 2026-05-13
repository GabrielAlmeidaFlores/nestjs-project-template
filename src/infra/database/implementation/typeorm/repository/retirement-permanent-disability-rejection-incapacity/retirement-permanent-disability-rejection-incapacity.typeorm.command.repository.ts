import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity/command/retirement-permanent-disability-rejection-incapacity.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionIncapacityTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionIncapacityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionIncapacity(
    props: RetirementPermanentDisabilityRejectionIncapacityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionIncapacityEntity,
      RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRejectionIncapacity(
    id: RetirementPermanentDisabilityRejectionIncapacityId,
    props: RetirementPermanentDisabilityRejectionIncapacityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionIncapacityEntity,
      RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
