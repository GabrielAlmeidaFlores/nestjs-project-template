import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/value-object/rural-or-hybrid-retirement-analysis-period-member-document-id.value-object';

import type { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/enum/rural-or-hybrid-retirement-analysis-period-member-document-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.entity.props.interface';

export class RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity extends BaseEntity<RuralOrHybridRetirementAnalysisPeriodMemberDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodMemberId: RuralOrHybridRetirementAnalysisPeriodMemberId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisPeriodMemberDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementAnalysisPeriodMemberId =
      props.ruralOrHybridRetirementAnalysisPeriodMemberId;
  }
}
