import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';

import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import type { RuralOrHybridRetirementRejectionKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/enum/rural-or-hybrid-retirement-rejection-kinship.enum';
import type { RuralOrHybridRetirementRejectionPeriodMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity.props.interface';

export class RuralOrHybridRetirementRejectionPeriodMemberEntity extends BaseEntity<RuralOrHybridRetirementRejectionPeriodMemberId> {
  public readonly name: string | null;
  public readonly federalDocument: string | null;
  public readonly kinship: RuralOrHybridRetirementRejectionKinshipEnum | null;
  public readonly hasReceivedRuralBenefit: boolean | null;
  public readonly benefitNumber: string | null;
  public readonly ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionPeriodMemberEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionPeriodMemberId, props);
    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.kinship = props.kinship ?? null;
    this.hasReceivedRuralBenefit = props.hasReceivedRuralBenefit ?? null;
    this.benefitNumber = props.benefitNumber ?? null;
    this.ruralOrHybridRetirementRejectionPeriodId =
      props.ruralOrHybridRetirementRejectionPeriodId;
  }
}
