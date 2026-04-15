import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-document/command/rural-or-hybrid-retirement-rejection-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.entity';
import { RuralOrHybridRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/value-object/rural-or-hybrid-retirement-rejection-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionDocumentTypeormEntity>
  implements RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionDocumentTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionDocument(
    props: RuralOrHybridRetirementRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = RuralOrHybridRetirementRejectionDocumentTypeormEntity.build(
      {
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementRejection:
          RuralOrHybridRetirementRejectionTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionId.toString(),
          } as RuralOrHybridRetirementRejectionTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionDocument(
    id: RuralOrHybridRetirementRejectionDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
