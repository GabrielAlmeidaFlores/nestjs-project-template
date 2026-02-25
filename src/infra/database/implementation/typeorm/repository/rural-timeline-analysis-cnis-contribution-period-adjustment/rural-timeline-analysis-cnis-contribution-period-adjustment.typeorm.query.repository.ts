import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/query/rural-timeline-analysis-cnis-contribution-period-adjustment.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByCnisContributionPeriodId(
    cnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity | null> {
    const result = await this.findOne({
      where: {
        ruralTimelineCnisContributionPeriod: {
          id: cnisContributionPeriodId.toString(),
        },
      },
      relations: { ruralTimelineCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
    );
  }
}
