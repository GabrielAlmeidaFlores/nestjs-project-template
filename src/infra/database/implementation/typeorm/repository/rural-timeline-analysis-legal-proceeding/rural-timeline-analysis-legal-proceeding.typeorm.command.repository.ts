import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/command/rural-timeline-analysis-legal-proceeding.command.repository.gateway';
import { RuralTimelineAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity';
import { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

@Injectable()
export class RuralTimelineAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisLegalProceedingTypeormEntity>
  implements RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisLegalProceedingTypeormEntity)
    repository: Repository<RuralTimelineAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRuralTimelineAnalysisLegalProceeding(
    id: RuralTimelineAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createRuralTimelineAnalysisLegalProceeding(
    props: RuralTimelineAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisLegalProceedingEntity,
      RuralTimelineAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
