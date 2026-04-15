import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';

import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity.props.interface';
import type { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/enum/rural-or-hybrid-retirement-rejection-period-member-document-type.enum';

export class RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity extends BaseEntity<RuralOrHybridRetirementRejectionPeriodMemberDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementRejectionPeriodMemberId: RuralOrHybridRetirementRejectionPeriodMemberId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionPeriodMemberDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionPeriodMemberDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementRejectionPeriodMemberId =
      props.ruralOrHybridRetirementRejectionPeriodMemberId;
  }
}
