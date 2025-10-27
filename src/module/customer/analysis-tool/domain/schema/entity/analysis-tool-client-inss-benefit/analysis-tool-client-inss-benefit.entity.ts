import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity.props.interface';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AnalysisToolClientInssBenefitEntity extends BaseEntity<AnalysisToolClientInssBenefitId> {
  @Description('Número do benefício INSS.')
  public readonly inssBenefitNumber: string;

  @Description('Cliente da ferramenta de análise associado ao benefício INSS.')
  public readonly analysisToolClient: AnalysisToolClientEntity;

  protected readonly _type = AnalysisToolClientInssBenefitEntity.name;

  public constructor(props: AnalysisToolClientInssBenefitEntityPropsInterface) {
    super(AnalysisToolClientInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.analysisToolClient = props.analysisToolClient;
  }
}
