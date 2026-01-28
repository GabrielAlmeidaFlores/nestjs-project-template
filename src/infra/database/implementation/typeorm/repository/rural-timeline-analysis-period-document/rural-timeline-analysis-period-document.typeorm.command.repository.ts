import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodDocumentTypeormEntity>
  implements RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodDocumentTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodDocument(
    props: RuralTimelineAnalysisPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodDocumentEntity,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodDocument(
    id: RuralTimelineAnalysisPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
