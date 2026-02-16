import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsRemunerationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsRemunerationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsRemunerationTypeormEntity,
    ): GetRetirementPlanningRppsRemunerationQueryResult => {
      return GetRetirementPlanningRppsRemunerationQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsRemunerationId(source.id),
        remunerationAmount: new DecimalValue(source.remunerationAmount),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationTypeormEntity,
      GetRetirementPlanningRppsRemunerationQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsRemunerationQueryResult,
    ): RetirementPlanningRppsRemunerationTypeormEntity => {
      return RetirementPlanningRppsRemunerationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        remunerationAmount: source.remunerationAmount.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsRemunerationQueryResult,
      RetirementPlanningRppsRemunerationTypeormEntity,
      mappingFunction,
    );
  }
}
