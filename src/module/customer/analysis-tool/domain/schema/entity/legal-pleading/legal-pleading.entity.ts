import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-status.enum';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import type { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import type { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import type { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import type { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import type { LegalPleadingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity.props.interface';
import type { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

export class LegalPleadingEntity extends BaseEntity<LegalPleadingId> {
  public readonly statementOfFacts: string;
  public readonly additionalComments: string | null;
  public readonly legalPleadingAiAnalysis: string | null;
  public readonly status: LegalPleadingStatusEnum;
  public readonly securitySystem: LegalPleadingSocialSecuritySystemEnum;
  public readonly benefitType: LegalPleadingBenefitTypeEnum;
  public readonly petitionType: LegalPleadingPetitionTypeEnum;
  public readonly benefitNumber: BenefitNumber | null;
  public readonly applicationSubmissionDate: Date | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly benefitInitialMonthlyIncome: DecimalValue | null;
  public readonly benefitCurrentMonthlyIncome: DecimalValue | null;
  public readonly socialSecurityObjective: LegalPleadingSocialSecurityObjectiveEnum | null;
  public readonly legalPleadingWritOfMandamusObjective: LegalPleadingWritOfMandamusObjectiveEnum | null;
  public readonly analysisToolClient: AnalysisToolClientEntity;
  public readonly legalPleadingAddress: LegalPleadingAddressEntity | null;
  public readonly createdBy: OrganizationMemberId;
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = LegalPleadingEntity.name;

  public constructor(props: LegalPleadingEntityPropsInterface) {
    super(LegalPleadingId, props);

    this.legalPleadingAiAnalysis = props.legalPleadingAiAnalysis ?? null;
    this.status =
      props.legalPleadingAiAnalysis === null
        ? LegalPleadingStatusEnum.IN_PROGRESS
        : LegalPleadingStatusEnum.COMPLETED;
    this.statementOfFacts = props.statementOfFacts;
    this.additionalComments = props.additionalComments ?? null;
    this.securitySystem = props.securitySystem;
    this.benefitType = props.benefitType;
    this.petitionType = props.petitionType;
    this.benefitNumber = props.benefitNumber ?? null;
    this.applicationSubmissionDate = props.applicationSubmissionDate ?? null;
    this.benefitTerminationDate = props.benefitTerminationDate ?? null;
    this.benefitInitialMonthlyIncome =
      props.benefitInitialMonthlyIncome ?? null;
    this.benefitCurrentMonthlyIncome =
      props.benefitCurrentMonthlyIncome ?? null;
    this.socialSecurityObjective = props.socialSecurityObjective ?? null;
    this.legalPleadingWritOfMandamusObjective =
      props.legalPleadingWritOfMandamusObjective ?? null;
    this.legalPleadingAddress = props.legalPleadingAddress ?? null;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
