import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
      DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
        ): DisabilityRetirementPlanningGrantTimeAcceleratorEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantTimeAcceleratorEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantTimeAcceleratorEntity({
            id: new DisabilityRetirementPlanningGrantTimeAcceleratorId(
              source.id,
            ),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
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
      DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
        ): DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity =>
          DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity.build({
            id: source.id.toString(),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
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
