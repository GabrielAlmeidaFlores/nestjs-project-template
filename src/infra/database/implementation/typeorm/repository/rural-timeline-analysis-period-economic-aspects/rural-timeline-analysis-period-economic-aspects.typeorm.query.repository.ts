import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/query/rural-timeline-analysis-period-economic-aspects.query.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodEconomicAspectsTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity>
  implements RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodEconomicAspectsId,
  ): Promise<RuralTimelineAnalysisPeriodEconomicAspectsEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelinePeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
      RuralTimelineAnalysisPeriodEconomicAspectsEntity,
    );
  }
}
