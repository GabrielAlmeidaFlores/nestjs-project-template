import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/command/rural-timeline-analysis-period-property.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodPropertyTypeormEntity>
  implements RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodPropertyTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodPropertyTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodProperty(
    props: RuralTimelineAnalysisPeriodPropertyEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodPropertyEntity,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisPeriodProperty(
    props: RuralTimelineAnalysisPeriodPropertyEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodPropertyEntity,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodProperty(
    id: RuralTimelineAnalysisPeriodPropertyId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
