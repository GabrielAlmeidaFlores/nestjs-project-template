import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-late-contribution/command/rural-timeline-analysis-cnis-contribution-period-late-contribution.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodLateContributionCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    props: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    props: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    id: RuralTimelineAnalysisCnisContributionPeriodLateContributionId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity>(
          RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
        );

      await repo.delete({
        ruralTimelineAnalysisCnisContributionPeriod: {
          id: contributionPeriodId.toString(),
        },
      });
    };
  }
}
