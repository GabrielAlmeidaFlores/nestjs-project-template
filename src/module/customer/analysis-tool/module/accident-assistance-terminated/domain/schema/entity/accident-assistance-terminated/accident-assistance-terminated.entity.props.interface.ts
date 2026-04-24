import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import type { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import type { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';
import type { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import type { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';

export interface AccidentAssistanceTerminatedEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceTerminatedId> {
  accidentDate?: Date | null;
  accidentDescription?: string | null;
  der: Date;
  denialDate: Date;
  category: AccidentAssistanceTerminatedCategoryEnum;
  inssPassword?: string | null;
  analysisName?: string | null;
  benefitCessationReason: string;
  hadPreviousIncapacityBenefit: boolean;
  previousIncapacityBenefitNumber?: string | null;
  previousIncapacityBenefitStartDate?: Date | null;
  previousIncapacityBenefitEndDate?: Date | null;
  extensionRequestStatus?: AccidentAssistanceTerminatedExtensionRequestStatusEnum | null;
  accidentAssistanceTerminatedResult?: AccidentAssistanceTerminatedResultEntity | null;
  accidentAssistanceTerminatedBenefit?: AccidentAssistanceTerminatedBenefitEntity[];
  accidentAssistanceTerminatedLegalProceeding?: AccidentAssistanceTerminatedLegalProceedingEntity[];
  accidentAssistanceTerminatedDocument?: AccidentAssistanceTerminatedDocumentEntity[];
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
