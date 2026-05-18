import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-result.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/command/rural-or-hybrid-retirement-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisTypeormEntity>
  implements RuralOrHybridRetirementAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysis(
    props: RuralOrHybridRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysis(
    id: RuralOrHybridRetirementAnalysisId,
    props: RuralOrHybridRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisResultId(
    id: RuralOrHybridRetirementAnalysisId,
    resultId: RuralOrHybridRetirementAnalysisResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      ruralOrHybridRetirementAnalysisResult:
        RuralOrHybridRetirementAnalysisResultTypeormEntity.build({
          id: resultId.toString(),
        } as RuralOrHybridRetirementAnalysisResultTypeormEntity),
    });
  }

  public deleteRuralOrHybridRetirementAnalysis(
    id: RuralOrHybridRetirementAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisEntity,
  ): RuralOrHybridRetirementAnalysisTypeormEntity {
    return RuralOrHybridRetirementAnalysisTypeormEntity.build({
      id: props.id.toString(),
      analysisName: props.analysisName,
      activityType: props.activityType,
      requestedBenefit: props.requestedBenefit,
      ruralOrHybridRetirementAnalysisResult:
        props.ruralOrHybridRetirementAnalysisResultId !== null
          ? RuralOrHybridRetirementAnalysisResultTypeormEntity.build({
              id: props.ruralOrHybridRetirementAnalysisResultId.toString(),
            } as RuralOrHybridRetirementAnalysisResultTypeormEntity)
          : null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisTypeormEntity);
  }
}
