import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetMedicalQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-with-relations.query.result';
import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MedicalQuestionGeneratorQueryRepositoryGateway {
  public abstract getMedicalQuestionGeneratorById(
    id: MedicalQuestionGeneratorId,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult | null>;

  public abstract findOneByMedicalQuestionGeneratorIdAndOrganizationIdWithRelationsOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult>;

  public abstract findOneByMedicalQuestionGeneratorIdAndOrganizationIdOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult>;
}
