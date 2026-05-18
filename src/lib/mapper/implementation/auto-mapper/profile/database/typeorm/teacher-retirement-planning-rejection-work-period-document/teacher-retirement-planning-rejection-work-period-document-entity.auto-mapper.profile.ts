import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/value-object/teacher-retirement-planning-rejection-work-period-document-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
      TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity => {
          if (!source.teacherRetirementPlanningRejectionWorkPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity(
            {
              id: new TeacherRetirementPlanningRejectionWorkPeriodDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              teacherRetirementPlanningRejectionWorkPeriodId:
                new TeacherRetirementPlanningRejectionWorkPeriodId(
                  source.teacherRetirementPlanningRejectionWorkPeriod.id,
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
      TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
      TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity =>
          TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              teacherRetirementPlanningRejectionWorkPeriod:
                TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.build(
                  {
                    id: source.teacherRetirementPlanningRejectionWorkPeriodId.toString(),
                  } as TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
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
