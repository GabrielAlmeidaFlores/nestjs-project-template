import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-time-accelerator/command/rural-or-hybrid-retirement-analysis-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisTimeAccelerator(
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisTimeAccelerator(
    id: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisTimeAccelerator(
    id: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntity,
  ): RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity {
    return RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity.build({
      id: props.id.toString(),
      timeType: props.timeType,
      institution: props.institution,
      recognitionInss: props.recognitionInss,
      affectsQualifyingPeriod: props.affectsQualifyingPeriod,
      technicalNote: props.technicalNote,
      startDate: props.startDate,
      endDate: props.endDate,
      gracePeriod: props.gracePeriod,
      viability: props.viability,
      ruralOrHybridRetirementAnalysis:
        RuralOrHybridRetirementAnalysisTypeormEntity.build({
          id: props.ruralOrHybridRetirementAnalysisId.toString(),
        } as RuralOrHybridRetirementAnalysisTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity);
  }
}
