import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period-earnings-history/command/retirement-permanent-disability-rejection-period-earnings-history.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionPeriodEarningsHistory(
    props: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionPeriodEarningsHistoryByPeriodId(
    periodId: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionPeriod: {
            id: periodId.toString(),
          },
        });
    };
  }
}
