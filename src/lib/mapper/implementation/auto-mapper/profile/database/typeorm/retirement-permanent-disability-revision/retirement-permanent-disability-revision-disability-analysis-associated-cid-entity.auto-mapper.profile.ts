import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/retirement-permanent-disability-revision-disability-analysis-associated-cid.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-associated-cid-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity => {
      if (!source.retirementPermanentDisabilityRevisionDisabilityAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity(
        {
          id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId(
            source.id,
          ),
          retirementPermanentDisabilityRevisionDisabilityAnalysisId:
            new RetirementPermanentDisabilityRevisionDisabilityAnalysisId(
              source.retirementPermanentDisabilityRevisionDisabilityAnalysis.id,
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
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity.build(
        {
          id: source.id.toString(),
          cid: source.cid,
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
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
      constructUsing(convert),
    );
  }
}
