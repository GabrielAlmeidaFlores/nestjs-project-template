import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-time-accelerator/command/teacher-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { TeacherRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionTimeAccelerator(
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);
    return this.create(mappedData);
  }

  public updateTeacherRetirementPlanningRejectionTimeAccelerator(
    id: TeacherRetirementPlanningRejectionTimeAcceleratorId,
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);
    return this.update(id.toString(), mappedData);
  }

  public deleteTeacherRetirementPlanningRejectionTimeAccelerator(
    id: TeacherRetirementPlanningRejectionTimeAcceleratorId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity {
    return TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity.build(
      {
        id: props.id.toString(),
        timeType: props.timeType,
        institution: props.institution,
        recognitionInss: props.recognitionInss,
        affectsQualifyingPeriod: props.affectsQualifyingPeriod,
        technicalNote: props.technicalNote,
        startDate: props.startDate,
        endDate: props.endDate,
        gracePeriod: props.gracePeriod,
        viability: props.viability,
        teacherRetirementPlanningRejection:
          TeacherRetirementPlanningRejectionTypeormEntity.build({
            id: props.teacherRetirementPlanningRejectionId.toString(),
          } as TeacherRetirementPlanningRejectionTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    );
  }
}
