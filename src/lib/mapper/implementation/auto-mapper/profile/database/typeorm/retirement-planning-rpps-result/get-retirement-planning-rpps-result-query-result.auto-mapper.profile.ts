import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { GetRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-result/query/result/get-retirement-planning-rpps-result.query.result';
import { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsResultTypeormEntity,
    ): GetRetirementPlanningRppsResultQueryResult => {
      return GetRetirementPlanningRppsResultQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsResultTypeormEntity,
      GetRetirementPlanningRppsResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsResultQueryResult,
    ): RetirementPlanningRppsResultTypeormEntity => {
      return RetirementPlanningRppsResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsResultQueryResult,
      RetirementPlanningRppsResultTypeormEntity,
      mappingFunction,
    );
  }
}
