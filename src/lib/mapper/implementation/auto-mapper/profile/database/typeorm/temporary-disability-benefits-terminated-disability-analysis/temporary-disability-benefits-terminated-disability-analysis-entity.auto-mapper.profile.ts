import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity => {
          if (!source.temporaryDisabilityBenefitsTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
                source.id,
              ),
              estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
              shortDisabilityDescription: source.shortDisabilityDescription,
              disabilityFromAccident: source.disabilityFromAccident,
              disablingConditionDescription:
                source.disablingConditionDescription,
              disabilityFromSevereDisease: source.disabilityFromSevereDisease,
              severeDisease: source.severeDisease,
              diseaseCustomName: source.diseaseCustomName,
              diseaseStartDate: source.diseaseStartDate,
              needsConstantAssistanceFromAnotherPerson:
                source.needsConstantAssistanceFromAnotherPerson,
              previousDisabilityBenefit: source.previousDisabilityBenefit,
              temporaryDisabilityBenefitsTerminatedId:
                new TemporaryDisabilityBenefitsTerminatedId(
                  source.temporaryDisabilityBenefitsTerminated.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.build(
            {
              id: source.id.toString(),
              estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
              shortDisabilityDescription: source.shortDisabilityDescription,
              disabilityFromAccident: source.disabilityFromAccident,
              disablingConditionDescription:
                source.disablingConditionDescription,
              disabilityFromSevereDisease: source.disabilityFromSevereDisease,
              severeDisease: source.severeDisease,
              diseaseCustomName: source.diseaseCustomName,
              diseaseStartDate: source.diseaseStartDate,
              needsConstantAssistanceFromAnotherPerson:
                source.needsConstantAssistanceFromAnotherPerson,
              previousDisabilityBenefit: source.previousDisabilityBenefit,
              temporaryDisabilityBenefitsTerminated:
                TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
                  id: source.temporaryDisabilityBenefitsTerminatedId.toString(),
                } as TemporaryDisabilityBenefitsTerminatedTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
