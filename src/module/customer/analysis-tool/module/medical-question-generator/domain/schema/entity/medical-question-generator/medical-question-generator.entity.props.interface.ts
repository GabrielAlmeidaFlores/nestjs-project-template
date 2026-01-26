import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import type { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import type { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import type { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import type { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';

export interface MedicalQuestionGeneratorEntityPropsInterface extends BaseEntityPropsInterface<MedicalQuestionGeneratorId> {
  disabilityDate?: Date | null;
  medicalQuestionGeneratorResult?: MedicalQuestionGeneratorResultEntity | null;
  medicalQuestionGeneratorInssBenefit?:
    | MedicalQuestionGeneratorInssBenefitEntity[]
    | null;
  medicalQuestionGeneratorLegalProceeding?:
    | MedicalQuestionGeneratorLegalProceedingEntity[]
    | null;
  medicalQuestionGeneratorDocument?:
    | MedicalQuestionGeneratorDocumentEntity[]
    | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
