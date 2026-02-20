import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-late-contribution/query/rural-timeline-analysis-cnis-contribution-period-late-contribution.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodLateContributionQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodLateContributionId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelineAnalysisCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
    );
  }
}
