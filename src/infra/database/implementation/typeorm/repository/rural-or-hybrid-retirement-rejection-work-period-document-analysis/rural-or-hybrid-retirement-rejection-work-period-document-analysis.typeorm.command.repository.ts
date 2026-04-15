import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document-analysis/command/rural-or-hybrid-retirement-rejection-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/value-object/rural-or-hybrid-retirement-rejection-work-period-document-analysis-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity>
  implements RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity,
  ): RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity {
    return RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity.build(
      {
        id: props.id.toString(),
        documentType: props.documentType,
        ownName: props.ownName,
        documentYear: props.documentYear,
        technicalNote: props.technicalNote,
        ruralOrHybridRetirementRejectionWorkPeriod:
          RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
          } as RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity,
    );
  }
}
