import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity';
import { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

@Injectable()
export class DisabilityRetirementPlanningInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningInssBenefitTypeormEntity,
    ): DisabilityRetirementPlanningInssBenefitEntity => {
      if (!source.disabilityRetirementPlanning) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningInssBenefitEntity.name,
          sourceClass:
            DisabilityRetirementPlanningInssBenefitTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        DisabilityRetirementPlanningEntity,
      );

      return new DisabilityRetirementPlanningInssBenefitEntity({
        id: new DisabilityRetirementPlanningInssBenefitId(source.id),
        benefitNumber: source.benefitNumber,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningInssBenefitTypeormEntity,
      DisabilityRetirementPlanningInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningInssBenefitEntity,
    ): DisabilityRetirementPlanningInssBenefitTypeormEntity => {
      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningEntity,
        DisabilityRetirementPlanningTypeormEntity,
      );

      return DisabilityRetirementPlanningInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        benefitNumber: source.benefitNumber,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningInssBenefitEntity,
      DisabilityRetirementPlanningInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
