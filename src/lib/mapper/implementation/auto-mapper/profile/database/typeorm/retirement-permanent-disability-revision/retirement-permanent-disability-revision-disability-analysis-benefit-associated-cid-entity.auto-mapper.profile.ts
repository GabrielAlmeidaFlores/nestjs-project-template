import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity => {
      if (
        !source.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity(
        {
          id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId(
            source.id,
          ),
          retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId:
            new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId(
              source.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit.id,
            ),
          cid: source.cid,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity.build(
        {
          id: source.id.toString(),
          cid: source.cid,
          retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit: {
            id: source.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId.toString(),
          } as RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
      constructUsing(convert),
    );
  }
}
