import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { LegalProceedingDetailEntityPropsInterface } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity.props.interface';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class LegalProceedingDetailEntity extends BaseEntity<LegalProceedingDetailId> {
  @Description('Detalhes do processo judicial')
  public readonly detail: string;

  @Description('Id correspondente ao processo judicial')
  public readonly analysisToolClientLegalProceedingId: AnalysisToolClientLegalProceedingId;

  protected readonly _type = LegalProceedingDetailEntity.name;

  public constructor(props: LegalProceedingDetailEntityPropsInterface) {
    super(LegalProceedingDetailId, props);

    this.detail = props.detail;
    this.analysisToolClientLegalProceedingId =
      props.analysisToolClientLegalProceedingId;
  }
}
