import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity => {
          if (!source.temporaryIncapacityBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity(
            {
              id: new TemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
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
              temporaryIncapacityBenefitRejectionId:
                new TemporaryIncapacityBenefitRejectionId(
                  source.temporaryIncapacityBenefitRejection.id,
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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity =>
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity.build(
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
              temporaryIncapacityBenefitRejection:
                TemporaryIncapacityBenefitRejectionTypeormEntity.build({
                  id: source.temporaryIncapacityBenefitRejectionId.toString(),
                } as TemporaryIncapacityBenefitRejectionTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
