import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { GetRetirementPlanningRppsInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-inss-benefit/query/result/get-retirement-planning-rpps-inss-benefit.query.result';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsInssBenefitTypeormEntity,
    ): GetRetirementPlanningRppsInssBenefitQueryResult => {
      return GetRetirementPlanningRppsInssBenefitQueryResult.build({
        id: new RetirementPlanningRppsInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsInssBenefitTypeormEntity,
      GetRetirementPlanningRppsInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsInssBenefitQueryResult,
    ): RetirementPlanningRppsInssBenefitTypeormEntity => {
      return RetirementPlanningRppsInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        retirementPlanningRpps: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsInssBenefitQueryResult,
      RetirementPlanningRppsInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
