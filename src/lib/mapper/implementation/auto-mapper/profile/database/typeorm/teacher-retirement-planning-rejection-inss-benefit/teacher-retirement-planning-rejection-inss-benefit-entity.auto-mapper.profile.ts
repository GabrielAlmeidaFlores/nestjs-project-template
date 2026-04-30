import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity';
import { TeacherRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/value-object/teacher-retirement-planning-rejection-inss-benefit-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
      TeacherRetirementPlanningRejectionInssBenefitEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
        ): TeacherRetirementPlanningRejectionInssBenefitEntity => {
          if (!source.teacherRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionInssBenefitEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionInssBenefitTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionInssBenefitEntity({
            id: new TeacherRetirementPlanningRejectionInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
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
      TeacherRetirementPlanningRejectionInssBenefitEntity,
      TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionInssBenefitEntity,
        ): TeacherRetirementPlanningRejectionInssBenefitTypeormEntity =>
          TeacherRetirementPlanningRejectionInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
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
