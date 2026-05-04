import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedPreviousBenefitId(
                source.id,
              ),
              benefitNumber: source.benefitNumber,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
                new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
                  source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis
                    .id,
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
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
        ): TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity.build(
            {
              id: source.id.toString(),
              benefitNumber: source.benefitNumber,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysis:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
