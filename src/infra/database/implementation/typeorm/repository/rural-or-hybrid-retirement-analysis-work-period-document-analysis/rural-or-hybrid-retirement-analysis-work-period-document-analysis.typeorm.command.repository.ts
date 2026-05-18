import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-document-analysis/command/rural-or-hybrid-retirement-analysis-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/value-object/rural-or-hybrid-retirement-analysis-work-period-document-analysis-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId,
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity,
  ): RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity {
    return RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity.build(
      {
        id: props.id.toString(),
        documentType: props.documentType,
        ownName: props.ownName,
        documentYear: props.documentYear,
        technicalNote: props.technicalNote,
        ruralOrHybridRetirementAnalysisWorkPeriod:
          RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisWorkPeriodId.toString(),
          } as RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity,
    );
  }
}
