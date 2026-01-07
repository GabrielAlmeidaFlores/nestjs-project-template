import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity.props.interface';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AnalysisToolClientLegalProceedingEntity extends BaseEntity<AnalysisToolClientLegalProceedingId> {
  @Description('Número do processo judicial.')
  public readonly legalProceedingNumber: string;

  @Description(
    'Cliente da ferramenta de análise associado ao processo judicial.',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description('Tipo do processo judicial.')
  public readonly type: string | null;

  @Description('Status do processo judicial.')
  public readonly status: string | null;

  @Description('Data da última atualização do processo judicial.')
  public readonly lastUpdated: Date | null;

  @Description('Data do prazo do processo judicial.')
  public readonly deadline: Date | null;

  protected readonly _type = AnalysisToolClientLegalProceedingEntity.name;

  public constructor(
    props: AnalysisToolClientLegalProceedingEntityPropsInterface,
  ) {
    super(AnalysisToolClientLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.analysisToolClient = props.analysisToolClient;
    this.type = props.type ?? null;
    this.status = props.status ?? null;
    this.lastUpdated = props.lastUpdated ?? null;
    this.deadline = props.deadline ?? null;
  }
}
