import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/command/rural-timeline-analysis-period-economic-aspects.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity>
  implements RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodEconomicAspects(
    props: RuralTimelineAnalysisPeriodEconomicAspectsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodEconomicAspectsEntity,
      RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodEconomicAspects(
    id: RuralTimelineAnalysisPeriodEconomicAspectsId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
