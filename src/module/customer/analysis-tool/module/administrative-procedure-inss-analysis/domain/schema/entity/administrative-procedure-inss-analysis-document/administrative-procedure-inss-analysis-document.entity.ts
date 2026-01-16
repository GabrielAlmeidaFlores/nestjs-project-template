import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity.props.interface';
import { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';
import { AdministrativeProcedureInssAnalysisDocumentId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/value-object/administrative-procedure-inss-analysis-document-id/administrative-procedure-inss-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdministrativeProcedureInssAnalysisDocumentEntity extends BaseEntity<AdministrativeProcedureInssAnalysisDocumentId> {
  @Description(
    'Documento do procedimento ou recurso (CRPS) administrativo do INSS.',
  )
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: AdministrativeProcedureInssAnalysisDocumentTypeEnum;

  @Description('Análise administrativa do INSS associado ao documento.')
  public readonly administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity;

  protected readonly _type =
    AdministrativeProcedureInssAnalysisDocumentEntity.name;

  public constructor(
    props: AdministrativeProcedureInssAnalysisDocumentEntityPropsInterface,
  ) {
    super(AdministrativeProcedureInssAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.administrativeProcedureInssAnalysis =
      props.administrativeProcedureInssAnalysis;
  }
}
