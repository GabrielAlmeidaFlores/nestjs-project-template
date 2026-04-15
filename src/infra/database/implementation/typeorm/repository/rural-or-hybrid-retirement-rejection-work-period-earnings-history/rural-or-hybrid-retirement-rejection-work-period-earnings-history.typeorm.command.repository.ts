import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-earnings-history/command/rural-or-hybrid-retirement-rejection-work-period-earnings-history.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/rural-or-hybrid-retirement-rejection-work-period-earnings-history.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/value-object/rural-or-hybrid-retirement-rejection-work-period-earnings-history-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
    props: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity.build(
        {
          id: props.id.toString(),
          competence: props.competence,
          remuneration: props.remuneration,
          indicators: props.indicators,
          paymentDate: props.paymentDate,
          contribution: props.contribution,
          contributionSalary: props.contributionSalary,
          competenceBelowMinimum: props.competenceBelowMinimum,
          ruralOrHybridRetirementRejectionWorkPeriod:
            RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity.build({
              id: props.ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
            } as RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity),
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        } as RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
      );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
    id: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
