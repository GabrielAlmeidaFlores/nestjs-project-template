import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-document/command/rural-or-hybrid-retirement-analysis-period-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/value-object/rural-or-hybrid-retirement-analysis-period-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisPeriodDocument(
    props: RuralOrHybridRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementAnalysisPeriod:
          RuralOrHybridRetirementAnalysisPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisPeriodId.toString(),
          } as RuralOrHybridRetirementAnalysisPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisPeriodDocument(
    id: RuralOrHybridRetirementAnalysisPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
