import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';

import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/enum/rural-or-hybrid-retirement-analysis-kinship.enum';
import type { RuralOrHybridRetirementAnalysisPeriodMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.entity.props.interface';

export class RuralOrHybridRetirementAnalysisPeriodMemberEntity extends BaseEntity<RuralOrHybridRetirementAnalysisPeriodMemberId> {
  public readonly name: string | null;
  public readonly federalDocument: string | null;
  public readonly kinship: RuralOrHybridRetirementAnalysisKinshipEnum | null;
  public readonly hasReceivedRuralBenefit: boolean | null;
  public readonly benefitNumber: string | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisPeriodMemberId, props);
    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.kinship = props.kinship ?? null;
    this.hasReceivedRuralBenefit = props.hasReceivedRuralBenefit ?? null;
    this.benefitNumber = props.benefitNumber ?? null;
    this.ruralOrHybridRetirementAnalysisPeriodId =
      props.ruralOrHybridRetirementAnalysisPeriodId;
  }
}
