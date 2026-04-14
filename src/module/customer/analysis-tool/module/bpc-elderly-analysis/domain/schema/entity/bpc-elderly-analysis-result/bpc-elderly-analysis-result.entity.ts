import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity.props.interface';
import { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcElderlyAnalysisResultEntity extends BaseEntity<BpcElderlyAnalysisResultId> {
  @Description('Análise completa do BPC ao Idoso.')
  public readonly completeAnalysis: string | null;

  @Description('Análise simplificada do BPC ao Idoso.')
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = BpcElderlyAnalysisResultEntity.name;

  public constructor(props: BpcElderlyAnalysisResultEntityPropsInterface) {
    super(BpcElderlyAnalysisResultId, props);

    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
