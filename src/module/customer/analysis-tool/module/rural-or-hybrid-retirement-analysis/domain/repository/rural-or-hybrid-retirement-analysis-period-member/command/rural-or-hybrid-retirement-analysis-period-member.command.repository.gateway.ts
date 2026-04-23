import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.entity';
import type { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisPeriodMember(
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisPeriodMember(
    id: RuralOrHybridRetirementAnalysisPeriodMemberId,
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisPeriodMember(
    id: RuralOrHybridRetirementAnalysisPeriodMemberId,
  ): TransactionType;
}
