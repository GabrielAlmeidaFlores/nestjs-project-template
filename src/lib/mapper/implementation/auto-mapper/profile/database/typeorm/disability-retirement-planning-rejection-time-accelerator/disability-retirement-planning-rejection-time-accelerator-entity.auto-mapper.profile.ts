import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
        ): DisabilityRetirementPlanningRejectionTimeAcceleratorEntity => {
          if (!source.disabilityRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningRejectionTimeAcceleratorEntity.name,
              sourceClass:
                DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningRejectionTimeAcceleratorEntity(
            {
              id: new DisabilityRetirementPlanningRejectionTimeAcceleratorId(
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
              disabilityRetirementPlanningRejectionId:
                new DisabilityRetirementPlanningRejectionId(
                  source.disabilityRetirementPlanningRejection.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
        ): DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity =>
          DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity.build(
            {
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
              disabilityRetirementPlanningRejection:
                DisabilityRetirementPlanningRejectionTypeormEntity.build({
                  id: source.disabilityRetirementPlanningRejectionId.toString(),
                } as DisabilityRetirementPlanningRejectionTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
