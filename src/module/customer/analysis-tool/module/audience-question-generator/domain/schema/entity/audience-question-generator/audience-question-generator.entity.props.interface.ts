import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import type { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

export interface AudienceQuestionGeneratorEntityPropsInterface
  extends BaseEntityPropsInterface<AudienceQuestionGeneratorId> {
  audienceQuestionGeneratorResult?: AudienceQuestionGeneratorResultEntity | null;
  audienceQuestionGeneratorDocument?: AudienceQuestionGeneratorDocumentEntity[] | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
