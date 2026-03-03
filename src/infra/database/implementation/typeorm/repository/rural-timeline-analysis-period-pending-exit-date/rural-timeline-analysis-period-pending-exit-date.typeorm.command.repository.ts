import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/command/rural-timeline-analysis-period-pending-exit-date.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPendingExitDateTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity>
  implements RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodPendingExitDate(
    props: RuralTimelineAnalysisPeriodPendingExitDateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodPendingExitDateEntity,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisPeriodPendingExitDate(
    props: RuralTimelineAnalysisPeriodPendingExitDateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodPendingExitDateEntity,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodPendingExitDate(
    id: RuralTimelineAnalysisPeriodPendingExitDateId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity>(
          RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
        );

      await repo.delete({
        ruralTimelineCnisContributionPeriod: {
          id: contributionPeriodId.toString(),
        },
      });
    };
  }
}
