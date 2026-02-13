import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

@Injectable()
export class RetirementPlanningRppsInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsInssBenefitEntityAutoMapperProfile.name;

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
    ): RetirementPlanningRppsInssBenefitEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsTypeormEntity,
        RetirementPlanningRppsEntity,
      );

      return new RetirementPlanningRppsInssBenefitEntity({
        id: new RetirementPlanningRppsInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        retirementPlanningRpps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsInssBenefitTypeormEntity,
      RetirementPlanningRppsInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsInssBenefitEntity,
    ): RetirementPlanningRppsInssBenefitTypeormEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsEntity,
        RetirementPlanningRppsTypeormEntity,
      );

      return RetirementPlanningRppsInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        retirementPlanningRpps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsInssBenefitEntity,
      RetirementPlanningRppsInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
