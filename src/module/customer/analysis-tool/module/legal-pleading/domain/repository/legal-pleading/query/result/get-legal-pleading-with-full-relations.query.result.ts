import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import type { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import type { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import type { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import type { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import type { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import type { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import type { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import type { BenefitNumber } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import type { LegalPleadingCode } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import type { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

export class GetLegalPleadingWithFullRelationsQueryResult extends BaseBuildableObject {
  public readonly id: LegalPleadingId;
  public readonly code: LegalPleadingCode;
  public readonly status: AnalysisStatusEnum;
  public readonly statementOfFacts: string | null;
  public readonly additionalComments: string | null;
  public readonly securitySystem: LegalPleadingSocialSecuritySystemEnum | null;
  public readonly benefitType: LegalPleadingBenefitTypeEnum | null;
  public readonly petitionType: LegalPleadingPetitionTypeEnum | null;
  public readonly benefitNumber: BenefitNumber | null;
  public readonly applicationSubmissionDate: Date | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly benefitInitialMonthlyIncome: DecimalValue | null;
  public readonly benefitCurrentMonthlyIncome: DecimalValue | null;
  public readonly socialSecurityObjective: LegalPleadingSocialSecurityObjectiveEnum | null;
  public readonly legalPleadingWritOfMandamusObjective: LegalPleadingWritOfMandamusObjectiveEnum | null;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly legalPleadingDocument: GetLegalPleadingDocumentWithRelationsQueryResult[];
  public readonly legalPleadingAddress: GetLegalPleadingAddressQueryResult | null;
  public readonly legalPleadingResult: GetLegalPleadingResultQueryResult | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetLegalPleadingWithFullRelationsQueryResult.name;
}
