import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { GetSpecialRetirementGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-document.query.result';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantDocumentTypeormEntity,
    ): GetSpecialRetirementGrantDocumentQueryResult => {
      return GetSpecialRetirementGrantDocumentQueryResult.build({
        ...source,
        id: new SpecialRetirementGrantDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantDocumentTypeormEntity,
      GetSpecialRetirementGrantDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantDocumentQueryResult,
    ): SpecialRetirementGrantDocumentTypeormEntity => {
      return SpecialRetirementGrantDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantDocumentQueryResult,
      SpecialRetirementGrantDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
