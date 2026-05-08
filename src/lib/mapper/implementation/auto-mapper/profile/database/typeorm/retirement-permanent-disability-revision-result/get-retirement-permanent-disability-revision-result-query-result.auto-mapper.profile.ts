import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionResultQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/query/result/get-retirement-permanent-disability-revision-result.query.result';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionResultQueryResultAutoMapperProfile.name;

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
    ): GetRetirementPermanentDisabilityRevisionResultQueryResult => {
      return GetRetirementPermanentDisabilityRevisionResultQueryResult.build({
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
      GetRetirementPermanentDisabilityRevisionResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionResultQueryResult,
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
        deletedAt: source.deletedAt ?? null,
        retirementPermanentDisabilityRevision: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionResultQueryResult,
      RetirementPermanentDisabilityRevisionResultTypeormEntity,
      mappingFunction,
    );
  }
}
