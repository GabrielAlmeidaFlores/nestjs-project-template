import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { SpecialActivityResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result-entity.props.interface';

export class SpecialActivityResultEntity extends BaseEntity<SpecialActivityResultId> {
  @Description('Análise completa da atividade especial em formato JSON')
  public readonly specialActivityCompleteAnalysis: string | null;

  @Description(
    'Análise simplificada da atividade especial em formato texto/markdown',
  )
  public readonly specialActivitySimplifiedAnalysis: string | null;

  @Description('Análise completa da atividade especial formatada para download')
  public readonly specialActivityCompleteAnalysisDownload: string | null;

  protected readonly _type = SpecialActivityResultEntity.name;

  public constructor(props: SpecialActivityResultEntityPropsInterface) {
    super(SpecialActivityResultId, props);

    this.specialActivityCompleteAnalysis =
      props.specialActivityCompleteAnalysis ?? null;
    this.specialActivitySimplifiedAnalysis =
      props.specialActivitySimplifiedAnalysis ?? null;
    this.specialActivityCompleteAnalysisDownload =
      props.specialActivityCompleteAnalysisDownload ?? null;
  }
}
