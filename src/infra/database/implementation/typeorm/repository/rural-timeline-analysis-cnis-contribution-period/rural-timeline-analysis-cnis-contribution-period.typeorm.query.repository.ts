import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>
  implements RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisCnisContributionPeriodTypeormEntity)
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodEntity,
    );
  }
}
