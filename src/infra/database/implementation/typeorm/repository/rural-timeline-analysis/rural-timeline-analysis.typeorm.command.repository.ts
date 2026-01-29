import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

@Injectable()
export class RuralTimelineAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisTypeormEntity>
  implements RuralTimelineAnalysisCommandRepositoryGateway
{
  protected readonly _type = RuralTimelineAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisTypeormEntity)
    repository: Repository<RuralTimelineAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimeline(
    props: RuralTimelineAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisEntity,
      RuralTimelineAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimeline(
    props: RuralTimelineAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisEntity,
      RuralTimelineAnalysisTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimeline(id: RuralTimelineAnalysisId): TransactionType {
    return this.delete(id.toString());
  }
}
