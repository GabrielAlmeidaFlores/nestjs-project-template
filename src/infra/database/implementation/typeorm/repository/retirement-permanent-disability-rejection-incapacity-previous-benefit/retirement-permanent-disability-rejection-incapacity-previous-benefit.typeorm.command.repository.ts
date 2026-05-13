import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-previous-benefit/command/retirement-permanent-disability-rejection-incapacity-previous-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionIncapacityPreviousBenefit(
    props: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionIncapacity: {
            id: incapacityId.toString(),
          },
        });
    };
  }
}
