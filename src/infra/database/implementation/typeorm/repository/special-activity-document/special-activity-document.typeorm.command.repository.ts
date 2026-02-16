import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialActivityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/command/special-activity-analysis-document.command.repository.gateway';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityDocumentId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';

@Injectable()
export class SpecialActivityDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialActivityDocumentTypeormEntity>
  implements SpecialActivityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpecialActivityDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityDocumentTypeormEntity)
    repository: Repository<SpecialActivityDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteSpecialActivityDocument(
    id: SpecialActivityDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createSpecialActivityDocument(
    props: SpecialActivityDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityDocumentEntity,
      SpecialActivityDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
