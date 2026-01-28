import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-document/command/rural-timeline-document.command.repository.gateway';
import { RuralTimelineDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/rural-timeline-document.entity';
import { RuralTimelineDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/value-object/rural-timeline-document-id/rural-timeline-document-id.value-object';

@Injectable()
export class RuralTimelineDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineDocumentTypeormEntity>
  implements RuralTimelineDocumentCommandRepositoryGateway
{
  protected readonly _type = RuralTimelineDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineDocumentTypeormEntity)
    repository: Repository<RuralTimelineDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineDocument(
    props: RuralTimelineDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineDocumentEntity,
      RuralTimelineDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineDocument(
    id: RuralTimelineDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
