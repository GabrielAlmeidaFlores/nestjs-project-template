import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsRemunerationEntityAutoMapperProfile.name;

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
    ): RetirementPlanningRppsRemunerationEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsTypeormEntity,
        RetirementPlanningRppsEntity,
      );

      return new RetirementPlanningRppsRemunerationEntity({
        ...source,
        id: new RetirementPlanningRppsRemunerationId(source.id),
        remunerationAmount: Number(source.remunerationAmount),
        retirementPlanningRpps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationTypeormEntity,
      RetirementPlanningRppsRemunerationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsRemunerationEntity,
    ): RetirementPlanningRppsRemunerationTypeormEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsEntity,
        RetirementPlanningRppsTypeormEntity,
      );

      return RetirementPlanningRppsRemunerationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        remunerationAmount: source.remunerationAmount.toString(),
        retirementPlanningRpps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsRemunerationEntity,
      RetirementPlanningRppsRemunerationTypeormEntity,
      mappingFunction,
    );
  }
}
