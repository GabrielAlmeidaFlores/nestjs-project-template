import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GetGeneralUrbanRetirementGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/result/get-general-urban-retirement-grant-period.query.result';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementGrantPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantPeriodTypeormEntity,
    ): GetGeneralUrbanRetirementGrantPeriodQueryResult => {
      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return GetGeneralUrbanRetirementGrantPeriodQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantPeriodId(source.id),
        contributionAverage,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantPeriodQueryResult,
    ): GeneralUrbanRetirementGrantPeriodTypeormEntity => {
      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return GeneralUrbanRetirementGrantPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        contributionAverage,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantPeriodQueryResult,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
