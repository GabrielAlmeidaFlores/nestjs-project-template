import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/query/rural-timeline-analysis-period-pending-exit-date.query.repository.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPendingExitDateTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity>
  implements RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodPendingExitDateId,
  ): Promise<RuralTimelineAnalysisPeriodPendingExitDateEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelineCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
      RuralTimelineAnalysisPeriodPendingExitDateEntity,
    );
  }
}
