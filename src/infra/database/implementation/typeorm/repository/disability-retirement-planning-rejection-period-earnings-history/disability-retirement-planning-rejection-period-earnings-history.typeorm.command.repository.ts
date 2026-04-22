import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period-earnings-history/command/disability-retirement-planning-rejection-period-earnings-history.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionPeriodEarningsHistory(
    props: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
    disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete({
          disabilityRetirementPlanningRejectionPeriod: {
            id: disabilityRetirementPlanningRejectionPeriodId.toString(),
          },
        });
    };
  }
}
