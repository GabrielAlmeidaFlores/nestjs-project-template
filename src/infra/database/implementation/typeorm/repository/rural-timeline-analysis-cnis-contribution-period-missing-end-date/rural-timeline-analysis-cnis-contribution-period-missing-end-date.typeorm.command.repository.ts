import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-missing-end-date/command/rural-timeline-analysis-cnis-contribution-period-missing-end-date.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    props: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    props: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    id: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity>(
          RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
        );

      await repo.delete({
        ruralTimelineAnalysisCnisContributionPeriod: {
          id: contributionPeriodId.toString(),
        },
      });
    };
  }
}
