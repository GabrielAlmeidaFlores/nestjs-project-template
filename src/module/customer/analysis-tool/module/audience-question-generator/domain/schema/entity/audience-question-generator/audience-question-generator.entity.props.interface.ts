import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import type { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import type { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import type { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import type { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';

export interface AudienceQuestionGeneratorEntityPropsInterface extends BaseEntityPropsInterface<AudienceQuestionGeneratorId> {
  audienceQuestionGeneratorResult?: AudienceQuestionGeneratorResultEntity | null;
  audienceQuestionGeneratorBenefit?:
    | AudienceQuestionGeneratorBenefitEntity[]
    | null;
  audienceQuestionGeneratorLegalProceeding?:
    | AudienceQuestionGeneratorLegalProceedingEntity[]
    | null;
  audienceQuestionGeneratorDocument?:
    | AudienceQuestionGeneratorDocumentEntity[]
    | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
