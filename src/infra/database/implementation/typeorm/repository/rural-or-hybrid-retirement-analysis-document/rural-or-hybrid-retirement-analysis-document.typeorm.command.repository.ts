import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-document/command/rural-or-hybrid-retirement-analysis-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity';
import { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisDocumentTypeormEntity>
  implements RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisDocumentTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisDocument(
    props: RuralOrHybridRetirementAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementAnalysis:
          RuralOrHybridRetirementAnalysisTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisId.toString(),
          } as RuralOrHybridRetirementAnalysisTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisDocument(
    id: RuralOrHybridRetirementAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
