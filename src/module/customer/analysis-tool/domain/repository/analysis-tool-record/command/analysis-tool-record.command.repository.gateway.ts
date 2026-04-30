import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export abstract class AnalysisToolRecordCommandRepositoryGateway {
  public abstract createAnalysisToolRecord(
    props: AnalysisToolRecordEntity,
  ): TransactionType;

  public abstract updateAnalysisToolRecord(
    id: AnalysisToolRecordId,
    props: AnalysisToolRecordEntity,
  ): TransactionType;

  public abstract updateAnalysisToolRecordStatus(
    id: AnalysisToolRecordId,
    status: AnalysisStatusEnum,
    updatedBy: OrganizationMemberId,
  ): TransactionType;

  public abstract updateAnalysisToolRecordAnalysisToolClient(
    id: AnalysisToolRecordId,
    analysisToolClientId: AnalysisToolClientId,
  ): TransactionType;

  public abstract deleteAnalysisToolRecord(
    id: AnalysisToolRecordId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
