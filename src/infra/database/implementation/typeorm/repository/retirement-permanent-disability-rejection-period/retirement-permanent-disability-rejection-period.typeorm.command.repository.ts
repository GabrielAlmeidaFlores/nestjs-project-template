import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period/command/retirement-permanent-disability-rejection-period.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionPeriodTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRejectionPeriodTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRejectionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionPeriod(
    props: RetirementPermanentDisabilityRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionPeriodEntity,
      RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteRetirementPermanentDisabilityRejectionPeriod(
    id: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllRetirementPermanentDisabilityRejectionPeriodsByRetirementPermanentDisabilityRejectionId(
    id: RetirementPermanentDisabilityRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejection: { id: id.toString() },
        });
    };
  }
}
