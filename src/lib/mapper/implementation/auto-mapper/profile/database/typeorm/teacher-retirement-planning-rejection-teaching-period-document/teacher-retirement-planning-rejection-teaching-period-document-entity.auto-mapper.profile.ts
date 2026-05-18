import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/value-object/teacher-retirement-planning-rejection-teaching-period-document-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
        ): TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity => {
          if (!source.teacherRetirementPlanningRejectionTeachingPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity(
            {
              id: new TeacherRetirementPlanningRejectionTeachingPeriodDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              teacherRetirementPlanningRejectionTeachingPeriodId:
                new TeacherRetirementPlanningRejectionTeachingPeriodId(
                  source.teacherRetirementPlanningRejectionTeachingPeriod.id,
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
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
        ): TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity =>
          TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              teacherRetirementPlanningRejectionTeachingPeriod:
                TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity.build(
                  {
                    id: source.teacherRetirementPlanningRejectionTeachingPeriodId.toString(),
                  } as TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
