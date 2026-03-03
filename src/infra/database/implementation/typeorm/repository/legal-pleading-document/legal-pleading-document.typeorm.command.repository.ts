import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';

@Injectable()
export class LegalPleadingDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingDocumentTypeormEntity>
  implements LegalPleadingDocumentCommandRepositoryGateway
{
  protected readonly _type = LegalPleadingDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingDocumentTypeormEntity)
    repository: Repository<LegalPleadingDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateLegalPleadingDocument(
    id: LegalPleadingDocumentId,
    props: LegalPleadingDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingDocumentEntity,
      LegalPleadingDocumentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createLegalPleadingDocument(
    props: LegalPleadingDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingDocumentEntity,
      LegalPleadingDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
