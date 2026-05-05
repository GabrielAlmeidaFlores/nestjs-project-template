import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTeacherRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/result/get-teacher-retirement-planning-rejection-with-relations.query.result';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TeacherRetirementPlanningRejectionQueryRepositoryGateway {
  public abstract findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
    id: TeacherRetirementPlanningRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTeacherRetirementPlanningRejectionWithRelationsQueryResult>;
}
