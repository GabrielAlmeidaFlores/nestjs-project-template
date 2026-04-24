import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralOrHybridRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-result.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionEntityAutoMapperProfile {
  protected readonly _type =
    RuralOrHybridRetirementRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralOrHybridRetirementRejectionTypeormEntity,
    ): RuralOrHybridRetirementRejectionEntity => {
      const ruralOrHybridRetirementRejectionResultId =
        source.ruralOrHybridRetirementRejectionResult !== undefined &&
        source.ruralOrHybridRetirementRejectionResult !== null
          ? new RuralOrHybridRetirementRejectionResultId(
              source.ruralOrHybridRetirementRejectionResult.id,
            )
          : null;

      return new RuralOrHybridRetirementRejectionEntity({
        id: new RuralOrHybridRetirementRejectionId(source.id),
        analysisName: source.analysisName,
        activityType: source.activityType,
        applicationSubmissionDate: source.applicationSubmissionDate,
        requestedBenefit: source.requestedBenefit,
        dateOfRejection: source.dateOfRejection,
        ruralOrHybridRetirementRejectionResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralOrHybridRetirementRejectionTypeormEntity,
      RuralOrHybridRetirementRejectionEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralOrHybridRetirementRejectionEntity,
    ): RuralOrHybridRetirementRejectionTypeormEntity => {
      const ruralOrHybridRetirementRejectionResult =
        source.ruralOrHybridRetirementRejectionResultId !== null
          ? ({
              id: source.ruralOrHybridRetirementRejectionResultId.toString(),
            } as RuralOrHybridRetirementRejectionResultTypeormEntity)
          : null;

      return RuralOrHybridRetirementRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        activityType: source.activityType,
        applicationSubmissionDate: source.applicationSubmissionDate,
        requestedBenefit: source.requestedBenefit,
        dateOfRejection: source.dateOfRejection,
        ruralOrHybridRetirementRejectionResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralOrHybridRetirementRejectionEntity,
      RuralOrHybridRetirementRejectionTypeormEntity,
      mappingFunction,
    );
  }
}
