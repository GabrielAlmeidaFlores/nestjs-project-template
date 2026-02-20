import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/query/rural-timeline-analysis-period-residence.query.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodResidenceTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodResidenceTypeormEntity>
  implements RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodResidenceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodResidenceTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodResidenceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodResidenceId,
  ): Promise<RuralTimelineAnalysisPeriodResidenceEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelinePeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
      RuralTimelineAnalysisPeriodResidenceEntity,
    );
  }
}
