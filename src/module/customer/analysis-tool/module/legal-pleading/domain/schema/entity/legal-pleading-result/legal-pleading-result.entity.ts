import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';

import type { LegalPleadingResultEntityPropsInterface } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity.props.interface';

export class LegalPleadingResultEntity extends BaseEntity<LegalPleadingResultId> {
  public readonly legalPleadingCompleteAnalysis: string | null;
  public readonly legalPleadingSimplifiedAnalysis: string | null;

  protected readonly _type = LegalPleadingResultEntity.name;

  public constructor(props: LegalPleadingResultEntityPropsInterface) {
    super(LegalPleadingResultId, props);

    this.legalPleadingCompleteAnalysis =
      props.legalPleadingCompleteAnalysis ?? null;
    this.legalPleadingSimplifiedAnalysis =
      props.legalPleadingSimplifiedAnalysis ?? null;
  }
}
