import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-document/command/rural-or-hybrid-retirement-analysis-work-period-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/value-object/rural-or-hybrid-retirement-analysis-work-period-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisWorkPeriodDocument(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementAnalysisWorkPeriod:
          RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisWorkPeriodId.toString(),
          } as RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisWorkPeriodDocument(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
