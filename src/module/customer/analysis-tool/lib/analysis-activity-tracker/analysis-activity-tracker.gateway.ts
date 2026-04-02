import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';

export type AppendAnalysisActivityTransactionParamsType = {
  action: AnalysisActivityActionEnum;
  analysisType: AnalysisToolRecordTypeEnum;
  organizationMemberId?: OrganizationMemberId;
  analysisToolClientId?: AnalysisToolClientId;
  analysisToolRecordId?: AnalysisToolRecordId;
  transactions: TransactionType[];
};

export abstract class AnalysisActivityTrackerGateway {
  public abstract appendActivityTransaction(
    params: AppendAnalysisActivityTransactionParamsType,
  ): TransactionType[];
}
