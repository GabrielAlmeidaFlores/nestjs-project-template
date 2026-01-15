import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

export abstract class JudicialCaseAnalysisCommandRepositoryGateway {
  public abstract createJudicialCaseAnalysis(
    props: JudicialCaseAnalysisEntity,
  ): TransactionType;

  public abstract updateJudicialCaseAnalysis(
    id: JudicialCaseAnalysisId,
    props: JudicialCaseAnalysisEntity,
  ): TransactionType;

  public abstract deleteJudicialCaseAnalysis(
    id: JudicialCaseAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}

