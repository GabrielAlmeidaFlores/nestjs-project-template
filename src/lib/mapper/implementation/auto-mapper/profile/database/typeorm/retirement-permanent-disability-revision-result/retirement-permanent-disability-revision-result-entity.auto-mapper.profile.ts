import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionResultEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionResultTypeormEntity,
    ): RetirementPermanentDisabilityRevisionResultEntity => {
      return new RetirementPermanentDisabilityRevisionResultEntity({
        id: new RetirementPermanentDisabilityRevisionResultId(source.id),
        retirementPermanentDisabilityRevisionFirstAnalysis:
          source.retirementPermanentDisabilityRevisionFirstAnalysis,
        retirementPermanentDisabilityRevisionCompleteAnalysis:
          source.retirementPermanentDisabilityRevisionCompleteAnalysis,
        retirementPermanentDisabilityRevisionSimplifiedAnalysis:
          source.retirementPermanentDisabilityRevisionSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionResultTypeormEntity,
      RetirementPermanentDisabilityRevisionResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPermanentDisabilityRevisionResultEntity,
    ): RetirementPermanentDisabilityRevisionResultTypeormEntity => {
      return RetirementPermanentDisabilityRevisionResultTypeormEntity.build({
        id: source.id.toString(),
        retirementPermanentDisabilityRevisionFirstAnalysis:
          source.retirementPermanentDisabilityRevisionFirstAnalysis,
        retirementPermanentDisabilityRevisionCompleteAnalysis:
          source.retirementPermanentDisabilityRevisionCompleteAnalysis,
        retirementPermanentDisabilityRevisionSimplifiedAnalysis:
          source.retirementPermanentDisabilityRevisionSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionResultEntity,
      RetirementPermanentDisabilityRevisionResultTypeormEntity,
      mappingFunction,
    );
  }
}
