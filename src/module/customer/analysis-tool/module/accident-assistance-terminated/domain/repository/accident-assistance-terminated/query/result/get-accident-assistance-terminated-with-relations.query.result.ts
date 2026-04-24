import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAccidentAssistanceTerminatedBenefitQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-benefit.query.result';
import type { GetAccidentAssistanceTerminatedDocumentQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-document.query.result';
import type { GetAccidentAssistanceTerminatedLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-legal-proceeding.query.result';
import type { GetAccidentAssistanceTerminatedResultQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/query/result/get-accident-assistance-terminated-result.query.result';
import type { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import type { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export class GetAccidentAssistanceTerminatedWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedId;
  public readonly der: Date;
  public readonly denialDate: Date;
  public readonly category: AccidentAssistanceTerminatedCategoryEnum;
  public readonly inssPassword: string | null;
  public readonly analysisName: string | null;
  public readonly benefitCessationReason: string;
  public readonly hadPreviousIncapacityBenefit: boolean;
  public readonly previousIncapacityBenefitNumber: string | null;
  public readonly previousIncapacityBenefitStartDate: Date | null;
  public readonly previousIncapacityBenefitEndDate: Date | null;
  public readonly extensionRequestStatus: AccidentAssistanceTerminatedExtensionRequestStatusEnum | null;
  public readonly accidentDate: Date | null;
  public readonly accidentDescription: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly accidentAssistanceTerminatedResult: GetAccidentAssistanceTerminatedResultQueryResult | null;
  public readonly accidentAssistanceTerminatedBenefit: GetAccidentAssistanceTerminatedBenefitQueryResult[];
  public readonly accidentAssistanceTerminatedLegalProceeding: GetAccidentAssistanceTerminatedLegalProceedingQueryResult[];
  public readonly accidentAssistanceTerminatedDocument: GetAccidentAssistanceTerminatedDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedWithRelationsQueryResult.name;
}
