import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningRejectionTypeormEntity,
    ): DisabilityRetirementPlanningRejectionEntity => {
      const resultId =
        source.disabilityRetirementPlanningRejectionResult !== null &&
        source.disabilityRetirementPlanningRejectionResult !== undefined
          ? new DisabilityRetirementPlanningRejectionResultId(
              source.disabilityRetirementPlanningRejectionResult.id,
            )
          : null;

      return new DisabilityRetirementPlanningRejectionEntity({
        id: new DisabilityRetirementPlanningRejectionId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        disabilityRetirementPlanningRejectionResultId: resultId,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        retirementType: source.retirementType,
        denialReason: source.denialReason,
        denialReasonDescription: source.denialReasonDescription,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionTypeormEntity,
      DisabilityRetirementPlanningRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningRejectionEntity,
    ): DisabilityRetirementPlanningRejectionTypeormEntity => {
      const disabilityRetirementPlanningRejectionResult =
        source.disabilityRetirementPlanningRejectionResultId !== null
          ? DisabilityRetirementPlanningRejectionResultTypeormEntity.build({
              id: source.disabilityRetirementPlanningRejectionResultId.toString(),
            } as DisabilityRetirementPlanningRejectionResultTypeormEntity)
          : undefined;

      return DisabilityRetirementPlanningRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        disabilityRetirementPlanningRejectionResult:
          disabilityRetirementPlanningRejectionResult ?? null,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        retirementType: source.retirementType,
        denialReason: source.denialReason,
        denialReasonDescription: source.denialReasonDescription,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionEntity,
      DisabilityRetirementPlanningRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
