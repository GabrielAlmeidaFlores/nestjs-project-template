import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-legal-proceeding.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/query/result/get-retirement-permanent-disability-revision-legal-proceeding.query.result';
import { RetirementPermanentDisabilityRevisionLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/value-object/retirement-permanent-disability-revision-legal-proceeding-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult => {
      return GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult.build(
        {
          id: new RetirementPermanentDisabilityRevisionLegalProceedingId(
            source.id,
          ),
          legalProceedingNumber: source.legalProceedingNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
    ): RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity => {
      return RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity.build(
        {
          id: source.id.toString(),
          legalProceedingNumber: source.legalProceedingNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
          retirementPermanentDisabilityRevision: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
      RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
