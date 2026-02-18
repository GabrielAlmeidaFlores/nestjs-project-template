import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/query/rural-timeline-analysis-period-property.query.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPropertyTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodPropertyTypeormEntity>
  implements RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodPropertyTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodPropertyTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodPropertyTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodPropertyId,
  ): Promise<RuralTimelineAnalysisPeriodPropertyEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelinePeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      RuralTimelineAnalysisPeriodPropertyEntity,
    );
  }
}
