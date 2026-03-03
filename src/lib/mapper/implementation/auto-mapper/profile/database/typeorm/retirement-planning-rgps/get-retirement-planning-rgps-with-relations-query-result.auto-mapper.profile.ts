import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-inss-benefit.typeorm.entity';
import { RetirementPlanningRgpsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations.query.result';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';
import { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';

@Injectable()
export class GetRetirementPlanningRgpsWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRgpsWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsTypeormEntity,
    ): GetRetirementPlanningRgpsWithRelationsQueryResult => {
      const retirementPlanningRgpsResult = this.mapper.map(
        source.retirementPlanningRgpsResult,
        RetirementPlanningRgpsResultTypeormEntity,
        RetirementPlanningRgpsResultEntity,
      );

      const retirementPlanningRgpsPeriod = this.mapper.mapArray(
        source.retirementPlanningRgpsPeriod ?? [],
        RetirementPlanningRgpsPeriodTypeormEntity,
        RetirementPlanningRgpsPeriodEntity,
      );

      const retirementPlanningRgpsBenefit = this.mapper.mapArray(
        source.retirementPlanningRgpsBenefit ?? [],
        RetirementPlanningRgpsInssBenefitTypeormEntity,
        RetirementPlanningRgpsInssBenefitEntity,
      );

      const retirementPlanningRgpsLegalProceeding = this.mapper.mapArray(
        source.retirementPlanningRgpsLegalProceeding ?? [],
        RetirementPlanningRgpsLegalProceedingTypeormEntity,
        RetirementPlanningRgpsLegalProceedingEntity,
      );

      return GetRetirementPlanningRgpsWithRelationsQueryResult.build({
        ...source,
        id: new RetirementPlanningRgpsId(source.id),
        retirementPlanningRgpsResult,
        retirementPlanningRgpsPeriod,
        retirementPlanningRgpsBenefit,
        retirementPlanningRgpsLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsTypeormEntity,
      GetRetirementPlanningRgpsWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
