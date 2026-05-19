import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-insured-quality/command/retirement-permanent-disability-rejection-insured-quality.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionInsuredQualityTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionInsuredQuality(
    props: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionInsuredQualityEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRejectionInsuredQuality(
    id: RetirementPermanentDisabilityRejectionInsuredQualityId,
    props: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionInsuredQualityEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
