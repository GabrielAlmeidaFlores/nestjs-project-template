import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisFamilyMember(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
  ): TransactionType;

  public abstract createManyPerCapitaIncomeForBpcAnalysisFamilyMember(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity[],
  ): TransactionType[];

  public abstract deletePerCapitaIncomeForBpcAnalysisFamilyMember(
    id: PerCapitaIncomeForBpcAnalysisFamilyMemberId,
  ): TransactionType;
}
