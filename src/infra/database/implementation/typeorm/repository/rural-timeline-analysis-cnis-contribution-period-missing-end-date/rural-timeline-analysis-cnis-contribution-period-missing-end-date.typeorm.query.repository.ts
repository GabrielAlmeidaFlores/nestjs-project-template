import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-missing-end-date/query/rural-timeline-analysis-cnis-contribution-period-missing-end-date.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelineAnalysisCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
    );
  }
}
