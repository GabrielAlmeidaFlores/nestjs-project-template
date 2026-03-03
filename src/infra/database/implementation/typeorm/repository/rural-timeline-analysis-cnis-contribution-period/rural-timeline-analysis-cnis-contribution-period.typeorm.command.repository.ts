import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>
  implements RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisCnisContributionPeriodTypeormEntity)
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisCnisContributionPeriod(
    props: RuralTimelineAnalysisCnisContributionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodEntity,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisCnisContributionPeriod(
    props: RuralTimelineAnalysisCnisContributionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodEntity,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisCnisContributionPeriod(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
