import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/command/rural-timeline-analysis-period.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodTypeormEntity>
  implements RuralTimelineAnalysisPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriod(
    props: RuralTimelineAnalysisPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodEntity,
      RuralTimelineAnalysisPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisPeriod(
    props: RuralTimelineAnalysisPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodEntity,
      RuralTimelineAnalysisPeriodTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisPeriod(
    id: RuralTimelineAnalysisPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
