import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';

import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';
import type { RuralOrHybridRetirementAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity.props.interface';

export class RuralOrHybridRetirementAnalysisDocumentEntity extends BaseEntity<RuralOrHybridRetirementAnalysisDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementAnalysisDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type = RuralOrHybridRetirementAnalysisDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
