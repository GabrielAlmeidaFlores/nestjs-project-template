import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export type CreateSystemActivitiesParamsType = {
  title: string;
  description: string;
  organizationMemberId?: OrganizationMemberId;
  analysisToolClientId?: AnalysisToolClientId;
  analysisToolRecordId?: AnalysisToolRecordId;
};

export abstract class SystemActivitiesCommandRepositoryGateway {
  public abstract createSystemActivity(
    params: CreateSystemActivitiesParamsType,
  ): TransactionType;
}
