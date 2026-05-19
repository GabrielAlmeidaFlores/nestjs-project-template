import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationResultEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity.props.interface';
import { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcDisabilityTerminationResultEntity extends BaseEntity<BpcDisabilityTerminationResultId> {
  @Description('Análise da decisão do INSS sobre a cessação de BPC PcD.')
  public readonly inssDecisionAnalysis: string | null;

  @Description('Análise completa da cessação de BPC PcD em formato JSON.')
  public readonly completeAnalysis: string | null;

  @Description('Texto da análise completa para download.')
  public readonly completeAnalysisDownload: string | null;

  @Description('Análise simplificada da cessação de BPC PcD.')
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = BpcDisabilityTerminationResultEntity.name;

  public constructor(
    props: BpcDisabilityTerminationResultEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationResultId, props);

    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
