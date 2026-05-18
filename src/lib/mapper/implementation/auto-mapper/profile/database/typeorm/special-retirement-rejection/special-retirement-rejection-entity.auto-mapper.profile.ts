import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

@Injectable()
export class SpecialRetirementRejectionEntityAutoMapperProfile {
  protected readonly _type =
    SpecialRetirementRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SpecialRetirementRejectionTypeormEntity,
    ): SpecialRetirementRejectionEntity => {
      const specialRetirementRejectionResultId =
        source.specialRetirementRejectionResult !== null &&
        source.specialRetirementRejectionResult !== undefined
          ? new SpecialRetirementRejectionResultId(
              source.specialRetirementRejectionResult.id,
            )
          : null;

      return new SpecialRetirementRejectionEntity({
        id: new SpecialRetirementRejectionId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        harmfulAgents: source.harmfulAgents,
        otherAgents: source.otherAgents,
        rejectionReason: source.rejectionReason,
        otherRejectionReason: source.otherRejectionReason,
        specialRetirementRejectionResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialRetirementRejectionTypeormEntity,
      SpecialRetirementRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialRetirementRejectionEntity,
    ): SpecialRetirementRejectionTypeormEntity => {
      return SpecialRetirementRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        harmfulAgents: source.harmfulAgents,
        otherAgents: source.otherAgents,
        rejectionReason: source.rejectionReason,
        otherRejectionReason: source.otherRejectionReason,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialRetirementRejectionEntity,
      SpecialRetirementRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
