import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionTeachingPeriodEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
        ): TeacherRetirementPlanningRejectionTeachingPeriodEntity => {
          if (!source.teacherRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionTeachingPeriodEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionTeachingPeriodEntity({
            id: new TeacherRetirementPlanningRejectionTeachingPeriodId(
              source.id,
            ),
            startDate: source.startDate,
            endDate: source.endDate,
            institutionName: source.institutionName,
            establishmentType: source.establishmentType,
            educationLevel: source.educationLevel,
            functionPerformed: source.functionPerformed,
            rejectionReason: source.rejectionReason,
            legalBasisForRecognition: source.legalBasisForRecognition,
            favorableJurisprudence: source.favorableJurisprudence,
            proofStrategy: source.proofStrategy,
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
      TeacherRetirementPlanningRejectionTeachingPeriodEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTeachingPeriodEntity,
        ): TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity =>
          TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity.build({
            id: source.id.toString(),
            startDate: source.startDate,
            endDate: source.endDate,
            institutionName: source.institutionName,
            establishmentType: source.establishmentType,
            educationLevel: source.educationLevel,
            functionPerformed: source.functionPerformed,
            rejectionReason: source.rejectionReason,
            legalBasisForRecognition: source.legalBasisForRecognition,
            favorableJurisprudence: source.favorableJurisprudence,
            proofStrategy: source.proofStrategy,
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
