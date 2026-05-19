import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/retirement-permanent-disability-revision-disability-analysis-benefit.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity => {
      if (!source.retirementPermanentDisabilityRevisionDisabilityAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity(
        {
          id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId(
            source.id,
          ),
          retirementPermanentDisabilityRevisionDisabilityAnalysisId:
            new RetirementPermanentDisabilityRevisionDisabilityAnalysisId(
              source.retirementPermanentDisabilityRevisionDisabilityAnalysis.id,
            ),
          hasPreviousBenefit: source.hasPreviousBenefit,
          benefitNumber: source.benefitNumber,
          benefitStartDate: source.benefitStartDate,
          benefitEndDate: source.benefitEndDate,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity.build(
        {
          id: source.id.toString(),
          hasPreviousBenefit: source.hasPreviousBenefit,
          benefitNumber: source.benefitNumber,
          benefitStartDate: source.benefitStartDate,
          benefitEndDate: source.benefitEndDate,
          retirementPermanentDisabilityRevisionDisabilityAnalysis: {
            id: source.retirementPermanentDisabilityRevisionDisabilityAnalysisId.toString(),
          } as RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
