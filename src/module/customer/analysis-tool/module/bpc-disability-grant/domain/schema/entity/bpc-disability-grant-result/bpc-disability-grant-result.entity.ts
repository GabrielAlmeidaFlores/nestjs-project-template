import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity.props.interface';
import { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcDisabilityGrantResultEntity extends BaseEntity<BpcDisabilityGrantResultId> {
  @Description('AnÃ¡lise completa do indeferimento de BPC PcD em formato JSON.')
  public readonly completeAnalysis: string | null;

  @Description('AnÃ¡lise simplificada do indeferimento de BPC PcD.')
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = BpcDisabilityGrantResultEntity.name;

  public constructor(props: BpcDisabilityGrantResultEntityPropsInterface) {
    super(BpcDisabilityGrantResultId, props);

    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
