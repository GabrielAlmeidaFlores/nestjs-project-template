import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity.props.interface';

export class RuralOrHybridRetirementRejectionResultEntity extends BaseEntity<RuralOrHybridRetirementRejectionResultId> {
  public readonly firstAnalysis: string | null;
  public readonly secondAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysisDownload: string | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type = RuralOrHybridRetirementRejectionResultEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionResultEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.secondAnalysis = props.secondAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysisDownload = props.simplifiedAnalysisDownload ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
