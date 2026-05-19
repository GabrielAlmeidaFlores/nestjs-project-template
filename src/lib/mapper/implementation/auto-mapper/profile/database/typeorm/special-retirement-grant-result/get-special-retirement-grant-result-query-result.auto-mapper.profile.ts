import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { GetSpecialRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/query/result/get-special-retirement-grant-result.query.result';
import { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantResultTypeormEntity,
    ): GetSpecialRetirementGrantResultQueryResult => {
      return GetSpecialRetirementGrantResultQueryResult.build({
        ...source,
        id: new SpecialRetirementGrantResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantResultTypeormEntity,
      GetSpecialRetirementGrantResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantResultQueryResult,
    ): SpecialRetirementGrantResultTypeormEntity => {
      return SpecialRetirementGrantResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantResultQueryResult,
      SpecialRetirementGrantResultTypeormEntity,
      mappingFunction,
    );
  }
}
