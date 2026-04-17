import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
      GeneralUrbanRetirementDenialTimeAcceleratorEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
        ): GeneralUrbanRetirementDenialTimeAcceleratorEntity => {
          if (!source.generalUrbanRetirementDenial) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                GeneralUrbanRetirementDenialTimeAcceleratorEntity.name,
              sourceClass:
                GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity.name,
            });
          }

          return new GeneralUrbanRetirementDenialTimeAcceleratorEntity({
            id: new GeneralUrbanRetirementDenialTimeAcceleratorId(source.id),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            generalUrbanRetirementDenialId: new GeneralUrbanRetirementDenialId(
              source.generalUrbanRetirementDenial.id,
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
      GeneralUrbanRetirementDenialTimeAcceleratorEntity,
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialTimeAcceleratorEntity,
        ): GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity =>
          GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity.build({
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
            generalUrbanRetirementDenial:
              GeneralUrbanRetirementDenialTypeormEntity.build({
                id: source.generalUrbanRetirementDenialId.toString(),
              } as GeneralUrbanRetirementDenialTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
