import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-earnings-history/command/disability-retirement-planning-grant-period-earnings-history.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/value-object/disability-retirement-planning-grant-period-earnings-history-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantPeriodEarningsHistory(
    props: DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningGrantPeriodEarningsHistory(
    id: DisabilityRetirementPlanningGrantPeriodEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByDisabilityRetirementPlanningGrantPeriodId(
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository(
        DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
      );

      await repo.softDelete({
        disabilityRetirementPlanningGrantPeriod: {
          id: disabilityRetirementPlanningGrantPeriodId.toString(),
        },
      });
    };
  }
}
