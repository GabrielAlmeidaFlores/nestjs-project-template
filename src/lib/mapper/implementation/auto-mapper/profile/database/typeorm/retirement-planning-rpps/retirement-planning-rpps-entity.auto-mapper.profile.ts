import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';

@Injectable()
export class RetirementPlanningRppsEntityAutoMapperProfile {
  protected readonly _type = RetirementPlanningRppsEntityAutoMapperProfile.name;

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
    ): RetirementPlanningRppsEntity => {
      const retirementPlanningRppsResult = this.mapper.map(
        source.retirementPlanningRppsResult,
        RetirementPlanningRppsResultTypeormEntity,
        RetirementPlanningRppsResultEntity,
      );

      const retirementPlanningRppsRemunerationCalculation = this.mapper.map(
        source.retirementPlanningRppsRemunerationCalculation,
        RetirementPlanningRppsRemunerationCalculationTypeormEntity,
        RetirementPlanningRppsRemunerationCalculationEntity,
      );

      return new RetirementPlanningRppsEntity({
        ...source,
        id: new RetirementPlanningRppsId(source.id),
        retirementPlanningRppsResult,
        retirementPlanningRppsRemunerationCalculation,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsTypeormEntity,
      RetirementPlanningRppsEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsEntity,
    ): RetirementPlanningRppsTypeormEntity => {
      const retirementPlanningRppsResult = this.mapper.map(
        source.retirementPlanningRppsResult,
        RetirementPlanningRppsResultEntity,
        RetirementPlanningRppsResultTypeormEntity,
      );

      const retirementPlanningRppsRemunerationCalculation = this.mapper.map(
        source.retirementPlanningRppsRemunerationCalculation,
        RetirementPlanningRppsRemunerationCalculationEntity,
        RetirementPlanningRppsRemunerationCalculationTypeormEntity,
      );

      return RetirementPlanningRppsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRppsResult,
        retirementPlanningRppsRemunerationCalculation,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsEntity,
      RetirementPlanningRppsTypeormEntity,
      mappingFunction,
    );
  }
}
