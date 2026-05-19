import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/value-object/rural-or-hybrid-retirement-analysis-work-period-document-analysis-id.value-object';

import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.entity.props.interface';

export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity extends BaseEntity<RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId> {
  public readonly documentType: string | null;
  public readonly ownName: string | null;
  public readonly documentYear: number | null;
  public readonly technicalNote: string | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId, props);
    this.documentType = props.documentType ?? null;
    this.ownName = props.ownName ?? null;
    this.documentYear = props.documentYear ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.ruralOrHybridRetirementAnalysisWorkPeriodId =
      props.ruralOrHybridRetirementAnalysisWorkPeriodId;
  }
}
