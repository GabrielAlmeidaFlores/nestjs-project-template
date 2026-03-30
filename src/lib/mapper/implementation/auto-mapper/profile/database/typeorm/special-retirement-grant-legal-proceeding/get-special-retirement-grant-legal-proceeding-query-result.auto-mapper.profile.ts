import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { GetSpecialRetirementGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-legal-proceeding.query.result';
import { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantLegalProceedingTypeormEntity,
    ): GetSpecialRetirementGrantLegalProceedingQueryResult => {
      return GetSpecialRetirementGrantLegalProceedingQueryResult.build({
        ...source,
        id: new SpecialRetirementGrantLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantLegalProceedingTypeormEntity,
      GetSpecialRetirementGrantLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantLegalProceedingQueryResult,
    ): SpecialRetirementGrantLegalProceedingTypeormEntity => {
      return SpecialRetirementGrantLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantLegalProceedingQueryResult,
      SpecialRetirementGrantLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
