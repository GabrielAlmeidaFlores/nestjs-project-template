import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { GetRetirementPlanningRppsRemunerationCalculationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/result/get-retirement-planning-rpps-remuneration-calculation.query.result';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsRemunerationCalculationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    ): GetRetirementPlanningRppsRemunerationCalculationQueryResult => {
      return GetRetirementPlanningRppsRemunerationCalculationQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsRemunerationCalculationId(source.id),
        totalAmount: source.totalAmount ? Number(source.totalAmount) : null,
        averageAmount: source.averageAmount
          ? Number(source.averageAmount)
          : null,
        topEightyPercentAverageAmount: source.topEightyPercentAverageAmount
          ? Number(source.topEightyPercentAverageAmount)
          : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
      GetRetirementPlanningRppsRemunerationCalculationQueryResult,
      mappingFunction,
    );
  }
}
