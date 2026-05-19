import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/value-object/rural-or-hybrid-retirement-analysis-period-document-id.value-object';

import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/enum/rural-or-hybrid-retirement-analysis-period-document-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.entity.props.interface';

export class RuralOrHybridRetirementAnalysisPeriodDocumentEntity extends BaseEntity<RuralOrHybridRetirementAnalysisPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementAnalysisPeriodId =
      props.ruralOrHybridRetirementAnalysisPeriodId;
  }
}
