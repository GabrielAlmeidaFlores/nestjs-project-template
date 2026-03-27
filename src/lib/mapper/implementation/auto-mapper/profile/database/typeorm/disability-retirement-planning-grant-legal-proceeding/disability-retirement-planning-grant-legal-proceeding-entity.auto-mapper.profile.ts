import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/value-object/disability-retirement-planning-grant-legal-proceeding-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantLegalProceedingEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
      DisabilityRetirementPlanningGrantLegalProceedingEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
        ): DisabilityRetirementPlanningGrantLegalProceedingEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantLegalProceedingEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantLegalProceedingEntity({
            id: new DisabilityRetirementPlanningGrantLegalProceedingId(
              source.id,
            ),
            legalProceedingNumber: source.legalProceedingNumber,
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
      DisabilityRetirementPlanningGrantLegalProceedingEntity,
      DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantLegalProceedingEntity,
        ): DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity =>
          DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
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
