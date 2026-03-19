import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisRemunerationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisRemunerationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisRemunerationQueryResult => {
      return GetGeneralUrbanRetirementAnalysisRemunerationQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementAnalysisRemunerationId(source.id),
        remunerationAmount: new DecimalValue(source.remunerationAmount),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
    ): GeneralUrbanRetirementAnalysisRemunerationTypeormEntity => {
      return GeneralUrbanRetirementAnalysisRemunerationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        remunerationAmount: source.remunerationAmount.toString(),
        generalUrbanRetirementAnalysis: null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      mappingFunction,
    );
  }
}
