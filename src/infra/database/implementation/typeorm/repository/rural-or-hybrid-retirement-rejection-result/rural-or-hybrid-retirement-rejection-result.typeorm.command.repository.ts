import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-result.typeorm.entity';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';

@Injectable()
export class RuralOrHybridRetirementRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionResultTypeormEntity>
  implements RuralOrHybridRetirementRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionResultTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionResult(
    props: RuralOrHybridRetirementRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionResult(
    props: RuralOrHybridRetirementRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(props.id.toString(), mappedData);
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionResultEntity,
  ): RuralOrHybridRetirementRejectionResultTypeormEntity {
    return RuralOrHybridRetirementRejectionResultTypeormEntity.build({
      id: props.id.toString(),
      firstAnalysis: props.firstAnalysis,
      secondAnalysis: props.secondAnalysis,
      completeAnalysis: props.completeAnalysis,
      simplifiedAnalysis: props.simplifiedAnalysis,
      completeAnalysisDownload: props.completeAnalysisDownload,
      simplifiedAnalysisDownload: props.simplifiedAnalysisDownload,
      ruralOrHybridRetirementRejection:
        RuralOrHybridRetirementRejectionTypeormEntity.build({
          id: props.ruralOrHybridRetirementRejectionId.toString(),
        } as RuralOrHybridRetirementRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionResultTypeormEntity);
  }
}
