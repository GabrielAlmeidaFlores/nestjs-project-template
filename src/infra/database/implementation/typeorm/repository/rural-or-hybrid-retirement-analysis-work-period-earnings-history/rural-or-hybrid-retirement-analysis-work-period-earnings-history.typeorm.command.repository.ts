import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-earnings-history/command/rural-or-hybrid-retirement-analysis-work-period-earnings-history.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/value-object/rural-or-hybrid-retirement-analysis-work-period-earnings-history-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity.build(
        {
          id: props.id.toString(),
          competence: props.competence,
          remuneration: props.remuneration,
          indicators: props.indicators,
          paymentDate: props.paymentDate,
          contribution: props.contribution,
          contributionSalary: props.contributionSalary,
          competenceBelowMinimum: props.competenceBelowMinimum,
          ruralOrHybridRetirementAnalysisWorkPeriod:
            RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity.build({
              id: props.ruralOrHybridRetirementAnalysisWorkPeriodId.toString(),
            } as RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity),
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        } as RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity,
      );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
    id: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
