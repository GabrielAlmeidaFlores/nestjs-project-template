import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/rural-timeline-period-family-group-member.entity';
import type { RuralTimelinePeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/value-object/rural-timeline-period-family-group-member-id/rural-timeline-period-family-group-member-id.value-object';

export abstract class RuralTimelinePeriodFamilyGroupMemberCommandRepositoryGateway {
  public abstract createRuralTimelinePeriodFamilyGroupMember(
    props: RuralTimelinePeriodFamilyGroupMemberEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriodFamilyGroupMember(
    id: RuralTimelinePeriodFamilyGroupMemberId,
  ): TransactionType;
}
