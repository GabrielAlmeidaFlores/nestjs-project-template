import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/temporary-incapacity-benefit-termination-disability-analysis.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity => {
          if (!source.temporaryIncapacityBenefitTermination) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity(
            {
              id: new TemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
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
              temporaryIncapacityBenefitTerminationId:
                new TemporaryIncapacityBenefitTerminationId(
                  source.temporaryIncapacityBenefitTermination.id,
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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity =>
          TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity.build(
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
              temporaryIncapacityBenefitTermination:
                TemporaryIncapacityBenefitTerminationTypeormEntity.build({
                  id: source.temporaryIncapacityBenefitTerminationId.toString(),
                } as TemporaryIncapacityBenefitTerminationTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
