import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period/command/rural-or-hybrid-retirement-analysis-work-period.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity>
  implements RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisWorkPeriod(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisWorkPeriod(
    id: RuralOrHybridRetirementAnalysisWorkPeriodId,
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisWorkPeriod(
    id: RuralOrHybridRetirementAnalysisWorkPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
  ): RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity {
    return RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity.build({
      id: props.id.toString(),
      bondOrigin: props.bondOrigin,
      startDate: props.startDate,
      endDate: props.endDate,
      category: props.category,
      competenceBelowTheMinimum: props.competenceBelowTheMinimum,
      pendencyReason: props.pendencyReason,
      periodConsideration: props.periodConsideration,
      contributionAverage: props.contributionAverage,
      status: props.status,
      gracePeriod: props.gracePeriod,
      jobType: props.jobType,
      activityDescription: props.activityDescription,
      ruralOrHybridRetirementAnalysis:
        RuralOrHybridRetirementAnalysisTypeormEntity.build({
          id: props.ruralOrHybridRetirementAnalysisId.toString(),
        } as RuralOrHybridRetirementAnalysisTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity);
  }
}
