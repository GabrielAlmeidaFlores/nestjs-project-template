import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsQueryResultAutoMapperProfile.name;

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
    ): GetRetirementPlanningRppsQueryResult => {
      return GetRetirementPlanningRppsQueryResult.build({
        id: new RetirementPlanningRppsId(source.id),
        careerStartDate: source.careerStartDate,
        publicServiceStartDate: source.publicServiceStartDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPlanningRppsTypeormEntity,
      GetRetirementPlanningRppsQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsQueryResult,
    ): RetirementPlanningRppsTypeormEntity => {
      return RetirementPlanningRppsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    createMap(
      this.mapper,
      GetRetirementPlanningRppsQueryResult,
      RetirementPlanningRppsTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
