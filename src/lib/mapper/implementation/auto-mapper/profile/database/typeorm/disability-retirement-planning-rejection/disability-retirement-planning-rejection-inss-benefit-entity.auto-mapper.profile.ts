import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/value-object/disability-retirement-planning-rejection-inss-benefit-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
      DisabilityRetirementPlanningRejectionInssBenefitEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
        ): DisabilityRetirementPlanningRejectionInssBenefitEntity => {
          if (!source.disabilityRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningRejectionInssBenefitEntity.name,
              sourceClass:
                DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningRejectionInssBenefitEntity({
            id: new DisabilityRetirementPlanningRejectionInssBenefitId(
              source.id,
            ),
            inssBenefit: source.inssBenefit,
            disabilityRetirementPlanningRejectionId:
              new DisabilityRetirementPlanningRejectionId(
                source.disabilityRetirementPlanningRejection.id,
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
      DisabilityRetirementPlanningRejectionInssBenefitEntity,
      DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionInssBenefitEntity,
        ): DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity =>
          DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            disabilityRetirementPlanningRejection:
              DisabilityRetirementPlanningRejectionTypeormEntity.build({
                id: source.disabilityRetirementPlanningRejectionId.toString(),
              } as DisabilityRetirementPlanningRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
