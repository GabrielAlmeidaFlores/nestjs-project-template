import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/value-object/rural-or-hybrid-retirement-rejection-work-period-document-analysis-id.value-object';

import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.entity.props.interface';

export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity extends BaseEntity<RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId> {
  public readonly documentType: string | null;
  public readonly ownName: string | null;
  public readonly documentYear: number | null;
  public readonly technicalNote: string | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId, props);
    this.documentType = props.documentType ?? null;
    this.ownName = props.ownName ?? null;
    this.documentYear = props.documentYear ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.ruralOrHybridRetirementRejectionWorkPeriodId =
      props.ruralOrHybridRetirementRejectionWorkPeriodId;
  }
}
