import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/result/get-general-urban-retirement-grant-special-period.query.result';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementGrantSpecialPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantSpecialPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    ): GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult => {
      return GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantSpecialPeriodId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult,
    ): GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity => {
      return GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
