import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/teacher-retirement-planning-rejection-document.entity';
import { TeacherRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/value-object/teacher-retirement-planning-rejection-document-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionDocumentEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionDocumentTypeormEntity,
      TeacherRetirementPlanningRejectionDocumentEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionDocumentTypeormEntity,
        ): TeacherRetirementPlanningRejectionDocumentEntity => {
          if (!source.teacherRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionDocumentEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionDocumentTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionDocumentEntity({
            id: new TeacherRetirementPlanningRejectionDocumentId(source.id),
            fileName: source.fileName,
            name: source.name,
            type: source.type,
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
      TeacherRetirementPlanningRejectionDocumentEntity,
      TeacherRetirementPlanningRejectionDocumentTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionDocumentEntity,
        ): TeacherRetirementPlanningRejectionDocumentTypeormEntity =>
          TeacherRetirementPlanningRejectionDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            name: source.name,
            type: source.type,
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
