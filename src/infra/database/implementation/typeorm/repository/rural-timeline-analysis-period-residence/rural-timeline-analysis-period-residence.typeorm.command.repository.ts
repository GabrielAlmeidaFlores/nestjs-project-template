import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/command/rural-timeline-analysis-period-residence.command.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodResidenceTypeormEntity>
  implements RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodResidenceTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodResidenceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodResidence(
    props: RuralTimelineAnalysisPeriodResidenceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodResidenceEntity,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisPeriodResidence(
    props: RuralTimelineAnalysisPeriodResidenceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodResidenceEntity,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodResidence(
    id: RuralTimelineAnalysisPeriodResidenceId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
