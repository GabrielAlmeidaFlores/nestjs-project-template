import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/result/get-retirement-permanent-disability-revision.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionQueryResult => {
      return GetRetirementPermanentDisabilityRevisionQueryResult.build({
        id: new RetirementPermanentDisabilityRevisionId(source.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      GetRetirementPermanentDisabilityRevisionQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionQueryResult,
    ): RetirementPermanentDisabilityRevisionTypeormEntity => {
      return RetirementPermanentDisabilityRevisionTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
        analysisName: null,
        category: null,
        retirementPermanentDisabilityRevisionResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionQueryResult,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      mappingFunction,
    );
  }
}
