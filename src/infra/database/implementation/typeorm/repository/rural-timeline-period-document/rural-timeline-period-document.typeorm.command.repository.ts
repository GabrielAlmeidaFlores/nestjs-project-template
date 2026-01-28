import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period-document/command/rural-timeline-period-document.command.repository.gateway';
import { RuralTimelinePeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/rural-timeline-period-document.entity';
import { RuralTimelinePeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/value-object/rural-timeline-period-document-id/rural-timeline-period-document-id.value-object';

@Injectable()
export class RuralTimelinePeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodDocumentTypeormEntity>
  implements RuralTimelinePeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelinePeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodDocumentTypeormEntity)
    repository: Repository<RuralTimelinePeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriodDocument(
    props: RuralTimelinePeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodDocumentEntity,
      RuralTimelinePeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriodDocument(
    id: RuralTimelinePeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
