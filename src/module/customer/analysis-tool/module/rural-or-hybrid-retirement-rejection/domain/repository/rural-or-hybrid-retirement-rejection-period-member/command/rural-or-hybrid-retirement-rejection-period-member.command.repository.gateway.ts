import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity';
import type { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';

export abstract class RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionPeriodMember(
    props: RuralOrHybridRetirementRejectionPeriodMemberEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionPeriodMember(
    id: RuralOrHybridRetirementRejectionPeriodMemberId,
    props: RuralOrHybridRetirementRejectionPeriodMemberEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionPeriodMember(
    id: RuralOrHybridRetirementRejectionPeriodMemberId,
  ): TransactionType;
}
