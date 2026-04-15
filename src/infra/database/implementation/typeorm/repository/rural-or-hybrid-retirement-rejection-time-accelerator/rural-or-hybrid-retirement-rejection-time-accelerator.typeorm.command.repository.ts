import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-time-accelerator/command/rural-or-hybrid-retirement-rejection-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity>
  implements RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionTimeAccelerator(
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionTimeAccelerator(
    id: RuralOrHybridRetirementRejectionTimeAcceleratorId,
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionTimeAccelerator(
    id: RuralOrHybridRetirementRejectionTimeAcceleratorId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntity,
  ): RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity {
    return RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity.build({
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
      ruralOrHybridRetirementRejection:
        RuralOrHybridRetirementRejectionTypeormEntity.build({
          id: props.ruralOrHybridRetirementRejectionId.toString(),
        } as RuralOrHybridRetirementRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity);
  }
}
