import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationCalculationEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsRemunerationCalculationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    ): RetirementPlanningRppsRemunerationCalculationEntity => {
      return new RetirementPlanningRppsRemunerationCalculationEntity({
        ...source,
        id: new RetirementPlanningRppsRemunerationCalculationId(source.id),
        totalAmount: Number(source.totalAmount),
        averageAmount: Number(source.averageAmount),
        topEightyPercentAverageAmount: Number(
          source.topEightyPercentAverageAmount,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
      RetirementPlanningRppsRemunerationCalculationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsRemunerationCalculationEntity,
    ): RetirementPlanningRppsRemunerationCalculationTypeormEntity => {
      return RetirementPlanningRppsRemunerationCalculationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        totalAmount: source.totalAmount.toString(),
        averageAmount: source.averageAmount.toString(),
        topEightyPercentAverageAmount:
          source.topEightyPercentAverageAmount.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationCalculationEntity,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
      mappingFunction,
    );
  }
}
