import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';

export type AppendAnalysisActivityTransactionParamsType = {
  action: AnalysisActivityActionEnum;
  analysisType: AnalysisToolRecordTypeEnum;
  organizationMemberId?: string;
  analysisToolClientId?: string;
  analysisToolRecordId?: string;
  transactions: TransactionType[];
};

export abstract class AnalysisActivityTrackerGateway {
  public abstract appendActivityTransaction(
    params: AppendAnalysisActivityTransactionParamsType,
  ): TransactionType[];
}
