import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
        ): TeacherRetirementPlanningRejectionTimeAcceleratorEntity => {
          if (!source.teacherRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionTimeAcceleratorEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionTimeAcceleratorEntity({
            id: new TeacherRetirementPlanningRejectionTimeAcceleratorId(
              source.id,
            ),
            timeType: source.timeType,
            institution: source.institution,
            recognitionInss: source.recognitionInss,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            gracePeriod: source.gracePeriod,
            viability: source.viability,
            teacherRetirementPlanningRejectionId:
              new TeacherRetirementPlanningRejectionId(
                source.teacherRetirementPlanningRejection.id,
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
      TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
      TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
        ): TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity =>
          TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity.build({
            id: source.id.toString(),
            timeType: source.timeType,
            institution: source.institution,
            recognitionInss: source.recognitionInss,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            gracePeriod: source.gracePeriod,
            viability: source.viability,
            teacherRetirementPlanningRejection:
              TeacherRetirementPlanningRejectionTypeormEntity.build({
                id: source.teacherRetirementPlanningRejectionId.toString(),
              } as TeacherRetirementPlanningRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
