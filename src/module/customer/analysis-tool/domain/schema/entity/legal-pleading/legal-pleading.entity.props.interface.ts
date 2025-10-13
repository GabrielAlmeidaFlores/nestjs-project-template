import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import type { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import type { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import type { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import type { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import type { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import type { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import type { AnalysisRecordStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-record-status.enum';

export interface LegalPleadingEntityPropsInterface
  extends BaseEntityPropsInterface<LegalPleadingId> {
  status: AnalysisRecordStatusEnum;
  statementOfFacts: string;
  additionalComments?: string | null;
  securitySystem: LegalPleadingSocialSecuritySystemEnum;
  benefitType: LegalPleadingBenefitTypeEnum;
  petitionType: LegalPleadingPetitionTypeEnum;
  benefitNumber?: BenefitNumber | null;
  applicationSubmissionDate?: Date | null;
  benefitTerminationDate?: Date | null;
  benefitInitialMonthlyIncome?: DecimalValue | null;
  benefitCurrentMonthlyIncome?: DecimalValue | null;
  socialSecurityObjective?: LegalPleadingSocialSecurityObjectiveEnum | null;
  legalPleadingWritOfMandamusObjective?: LegalPleadingWritOfMandamusObjectiveEnum | null;
  analysisToolClient: AnalysisToolClientEntity;
  legalPleadingAddress?: LegalPleadingAddressEntity | null;
  legalPleadingResult?: LegalPleadingResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
