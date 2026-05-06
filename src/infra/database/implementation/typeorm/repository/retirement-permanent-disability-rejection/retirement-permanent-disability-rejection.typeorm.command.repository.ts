import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-result.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/command/retirement-permanent-disability-rejection.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionTypeormEntity>
  implements RetirementPermanentDisabilityRejectionCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRejectionTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejection(
    props: RetirementPermanentDisabilityRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionEntity,
      RetirementPermanentDisabilityRejectionTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRejection(
    id: RetirementPermanentDisabilityRejectionId,
    props: RetirementPermanentDisabilityRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionEntity,
      RetirementPermanentDisabilityRejectionTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public updateRetirementPermanentDisabilityRejectionResultId(
    id: RetirementPermanentDisabilityRejectionId,
    resultId: RetirementPermanentDisabilityRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      retirementPermanentDisabilityRejectionResult:
        RetirementPermanentDisabilityRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as RetirementPermanentDisabilityRejectionResultTypeormEntity),
    });
  }

  public updateRetirementPermanentDisabilityRejectionIncapacityId(
    id: RetirementPermanentDisabilityRejectionId,
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType {
    return this.update(id.toString(), {
      retirementPermanentDisabilityRejectionIncapacity:
        RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.build({
          id: incapacityId.toString(),
        } as RetirementPermanentDisabilityRejectionIncapacityTypeormEntity),
    });
  }

  public updateRetirementPermanentDisabilityRejectionInsuredQualityId(
    id: RetirementPermanentDisabilityRejectionId,
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
  ): TransactionType {
    return this.update(id.toString(), {
      retirementPermanentDisabilityRejectionInsuredQuality:
        RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity.build(
          {
            id: insuredQualityId.toString(),
          } as RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
        ),
    });
  }
}
