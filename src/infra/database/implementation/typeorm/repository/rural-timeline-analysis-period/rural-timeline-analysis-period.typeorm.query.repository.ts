import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodTypeormEntity>
  implements RuralTimelineAnalysisPeriodQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodId,
  ): Promise<RuralTimelineAnalysisPeriodEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: {
        ruralTimeline: true,
        ruralTimelinePeriodProperty: true,
        ruralTimelinePeriodResidence: true,
      },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodTypeormEntity,
      RuralTimelineAnalysisPeriodEntity,
    );
  }
}
