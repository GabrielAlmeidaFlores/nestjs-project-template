import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import type { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';
import type { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import type { SpeechGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity';
import type { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';

export interface SpeechGeneratorEntityPropsInterface extends BaseEntityPropsInterface<SpeechGeneratorId> {
  speechGeneratorDocument?: SpeechGeneratorDocumentEntity[] | null;
  speechGeneratorBenefit?: SpeechGeneratorBenefitEntity[] | null;
  speechGeneratorLegalProceeding?:
    | SpeechGeneratorLegalProceedingEntity[]
    | null;
  speechGeneratorResult?: SpeechGeneratorResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
