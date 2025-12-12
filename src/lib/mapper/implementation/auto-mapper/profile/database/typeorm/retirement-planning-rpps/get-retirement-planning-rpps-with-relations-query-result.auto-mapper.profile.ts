import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { GetRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps-with-relations.query.result';
import { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import { GetRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/query/result/get-retirement-planning-rpps-result.query.result';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsTypeormEntity,
    ): GetRetirementPlanningRppsWithRelationsQueryResult => {
      const retirementPlanningRppsResult = source.retirementPlanningRppsResult
        ? this.mapper.map(
            source.retirementPlanningRppsResult,
            RetirementPlanningRppsResultTypeormEntity,
            GetRetirementPlanningRppsResultQueryResult,
          )
        : null;

      const remunerations = source.remunerations
        ? this.mapper.mapArray(
            source.remunerations,
            RetirementPlanningRppsRemunerationTypeormEntity,
            GetRetirementPlanningRppsRemunerationQueryResult,
          )
        : [];

      const periods = source.periods
        ? this.mapper.mapArray(
            source.periods,
            RetirementPlanningRppsPeriodTypeormEntity,
            GetRetirementPlanningRppsPeriodQueryResult,
          )
        : [];

      return GetRetirementPlanningRppsWithRelationsQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsId(source.id),
        retirementPlanningRppsResult,
        remunerations,
        periods,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsTypeormEntity,
      GetRetirementPlanningRppsWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsWithRelationsQueryResult,
    ): RetirementPlanningRppsTypeormEntity => {
      const retirementPlanningRppsResult = source.retirementPlanningRppsResult
        ? this.mapper.map(
            source.retirementPlanningRppsResult,
            GetRetirementPlanningRppsResultQueryResult,
            RetirementPlanningRppsResultTypeormEntity,
          )
        : undefined;

      const remunerations = this.mapper.mapArray(
        source.remunerations,
        GetRetirementPlanningRppsRemunerationQueryResult,
        RetirementPlanningRppsRemunerationTypeormEntity,
      );

      const periods = this.mapper.mapArray(
        source.periods,
        GetRetirementPlanningRppsPeriodQueryResult,
        RetirementPlanningRppsPeriodTypeormEntity,
      );

      return RetirementPlanningRppsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRppsResult,
        remunerations,
        periods,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsWithRelationsQueryResult,
      RetirementPlanningRppsTypeormEntity,
      mappingFunction,
    );
  }
}
