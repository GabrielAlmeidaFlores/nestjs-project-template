import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';
import { DisabilityRetirementPlanningGrantInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/value-object/disability-retirement-planning-grant-inss-benefit-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
      DisabilityRetirementPlanningGrantInssBenefitEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
        ): DisabilityRetirementPlanningGrantInssBenefitEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantInssBenefitEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantInssBenefitTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantInssBenefitEntity({
            id: new DisabilityRetirementPlanningGrantInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
            disabilityRetirementPlanningGrantId:
              new DisabilityRetirementPlanningGrantId(
                source.disabilityRetirementPlanningGrant.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantInssBenefitEntity,
      DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantInssBenefitEntity,
        ): DisabilityRetirementPlanningGrantInssBenefitTypeormEntity =>
          DisabilityRetirementPlanningGrantInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            disabilityRetirementPlanningGrant:
              DisabilityRetirementPlanningGrantTypeormEntity.build({
                id: source.disabilityRetirementPlanningGrantId.toString(),
              } as DisabilityRetirementPlanningGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
