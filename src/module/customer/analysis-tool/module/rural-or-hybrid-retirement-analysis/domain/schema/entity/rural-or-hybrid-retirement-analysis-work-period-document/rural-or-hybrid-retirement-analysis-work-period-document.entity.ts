import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/value-object/rural-or-hybrid-retirement-analysis-work-period-document-id.value-object';

import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/enum/rural-or-hybrid-retirement-analysis-work-period-document-type.enum';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.entity.props.interface';

export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity extends BaseEntity<RuralOrHybridRetirementAnalysisWorkPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisWorkPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementAnalysisWorkPeriodId =
      props.ruralOrHybridRetirementAnalysisWorkPeriodId;
  }
}
