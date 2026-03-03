import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdministrativeProcedureInssAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity.props.interface';
import { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdministrativeProcedureInssAnalysisResultEntity extends BaseEntity<AdministrativeProcedureInssAnalysisResultId> {
  @Description('Nome do cliente.')
  public readonly clientName: string | null;

  @Description('Documento federal do cliente.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente.')
  public readonly clientBirthDate: Date | null;

  @Description('Data da última filiação do cliente.')
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Análise completa do procedimento administrativo do INSS.')
  public readonly administrativeProcedureInssCompleteAnalysis: string | null;

  @Description('Análise simplificada do procedimento administrativo do INSS.')
  public readonly administrativeProcedureInssSimplifiedAnalysis: string | null;

  protected readonly _type =
    AdministrativeProcedureInssAnalysisResultEntity.name;

  public constructor(
    props: AdministrativeProcedureInssAnalysisResultEntityPropsInterface,
  ) {
    super(AdministrativeProcedureInssAnalysisResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.administrativeProcedureInssCompleteAnalysis =
      props.administrativeProcedureInssCompleteAnalysis ?? null;
    this.administrativeProcedureInssSimplifiedAnalysis =
      props.administrativeProcedureInssSimplifiedAnalysis ?? null;
  }
}
