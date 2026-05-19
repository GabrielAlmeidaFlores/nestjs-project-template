import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period/command/rural-or-hybrid-retirement-rejection-work-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity>
  implements RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionWorkPeriod(
    props: RuralOrHybridRetirementRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionWorkPeriod(
    id: RuralOrHybridRetirementRejectionWorkPeriodId,
    props: RuralOrHybridRetirementRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionWorkPeriod(
    id: RuralOrHybridRetirementRejectionWorkPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionWorkPeriodEntity,
  ): RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity {
    return RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity.build({
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
      ruralOrHybridRetirementRejection:
        RuralOrHybridRetirementRejectionTypeormEntity.build({
          id: props.ruralOrHybridRetirementRejectionId.toString(),
        } as RuralOrHybridRetirementRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity);
  }
}
