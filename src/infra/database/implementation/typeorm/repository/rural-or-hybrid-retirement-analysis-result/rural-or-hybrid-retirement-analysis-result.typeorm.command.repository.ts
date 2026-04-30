import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-result.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisResultTypeormEntity>
  implements RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisResultTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisResult(
    props: RuralOrHybridRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisResult(
    props: RuralOrHybridRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisResult(
    id: RuralOrHybridRetirementAnalysisResultId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisResultEntity,
  ): RuralOrHybridRetirementAnalysisResultTypeormEntity {
    return RuralOrHybridRetirementAnalysisResultTypeormEntity.build({
      id: props.id.toString(),
      firstAnalysis: props.firstAnalysis,
      secondAnalysis: props.secondAnalysis,
      completeAnalysis: props.completeAnalysis,
      simplifiedAnalysis: props.simplifiedAnalysis,
      completeAnalysisDownload: props.completeAnalysisDownload,
      simplifiedAnalysisDownload: props.simplifiedAnalysisDownload,
      ruralOrHybridRetirementAnalysis:
        RuralOrHybridRetirementAnalysisTypeormEntity.build({
          id: props.ruralOrHybridRetirementAnalysisId.toString(),
        } as RuralOrHybridRetirementAnalysisTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisResultTypeormEntity);
  }
}
