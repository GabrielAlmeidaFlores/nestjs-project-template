import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/permanent-incapacity-benefit-terminated-disability-analysis.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity => {
          if (!source.permanentIncapacityBenefitTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity(
            {
              id: new PermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
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
              previousBenefitNumber: source.previousBenefitNumber,
              permanentIncapacityBenefitTerminatedId:
                new PermanentIncapacityBenefitTerminatedId(
                  source.permanentIncapacityBenefitTerminated.id,
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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity =>
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity.build(
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
              previousBenefitNumber: source.previousBenefitNumber,
              permanentIncapacityBenefitTerminated:
                PermanentIncapacityBenefitTerminatedTypeormEntity.build({
                  id: source.permanentIncapacityBenefitTerminatedId.toString(),
                } as PermanentIncapacityBenefitTerminatedTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
