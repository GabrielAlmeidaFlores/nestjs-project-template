import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';
import { GetTermsQueryResult } from '@module/customer/account/domain/repository/terms/query/result/get-terms.query.result';
import { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';

@Injectable()
export class GetTermsQueryResultAutoMapperProfile {
  protected readonly _type = GetTermsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: TermsAndConditionsTypeormEntity,
    ): GetTermsQueryResult => {
      return GetTermsQueryResult.build({
        ...source,
        id: new TermsId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      TermsAndConditionsTypeormEntity,
      GetTermsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetTermsQueryResult,
    ): TermsAndConditionsTypeormEntity => {
      return TermsAndConditionsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetTermsQueryResult,
      TermsAndConditionsTypeormEntity,
      mappingFunction,
    );
  }
}
