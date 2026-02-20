import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/command/rural-timeline-cnis-contribution-period-overdue-contribution.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodOverdueContributionTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity>
  implements
    RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodOverdueContributionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    )
    repository: Repository<RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineCnisContributionPeriodOverdueContribution(
    props: RuralTimelineCnisContributionPeriodOverdueContributionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodOverdueContributionEntity,
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineCnisContributionPeriodOverdueContribution(
    props: RuralTimelineCnisContributionPeriodOverdueContributionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodOverdueContributionEntity,
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineCnisContributionPeriodOverdueContribution(
    id: RuralTimelineCnisContributionPeriodOverdueContributionId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity>(
          RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
        );

      await repo.delete({
        ruralTimelineCnisContributionPeriod: {
          id: contributionPeriodId.toString(),
        },
      });
    };
  }
}
