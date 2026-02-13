import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-legal-proceeding.typeorm.entity';
import { GetRetirementPlanningRppsLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-legal-proceeding/query/result/get-retirement-planning-rpps-legal-proceeding.query.result';
import { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsLegalProceedingTypeormEntity,
    ): GetRetirementPlanningRppsLegalProceedingQueryResult => {
      return GetRetirementPlanningRppsLegalProceedingQueryResult.build({
        id: new RetirementPlanningRppsLegalProceedingId(source.id),
        legalProceeding: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsLegalProceedingTypeormEntity,
      GetRetirementPlanningRppsLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsLegalProceedingQueryResult,
    ): RetirementPlanningRppsLegalProceedingTypeormEntity => {
      return RetirementPlanningRppsLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceeding,
        retirementPlanningRpps: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsLegalProceedingQueryResult,
      RetirementPlanningRppsLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
