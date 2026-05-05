import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator.entity';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';

export abstract class TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionTimeAccelerator(
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRejectionTimeAccelerator(
    id: TeacherRetirementPlanningRejectionTimeAcceleratorId,
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningRejectionTimeAccelerator(
    id: TeacherRetirementPlanningRejectionTimeAcceleratorId,
  ): TransactionType;
}
