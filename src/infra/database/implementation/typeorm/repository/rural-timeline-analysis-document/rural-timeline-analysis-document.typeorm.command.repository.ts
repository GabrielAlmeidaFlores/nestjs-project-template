import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/command/rural-timeline-analysis-document.command.repository.gateway';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisDocumentTypeormEntity>
  implements RuralTimelineAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisDocumentTypeormEntity)
    repository: Repository<RuralTimelineAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisDocument(
    props: RuralTimelineAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisDocumentEntity,
      RuralTimelineAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisDocument(
    props: RuralTimelineAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisDocumentEntity,
      RuralTimelineAnalysisDocumentTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisDocument(
    id: RuralTimelineAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
