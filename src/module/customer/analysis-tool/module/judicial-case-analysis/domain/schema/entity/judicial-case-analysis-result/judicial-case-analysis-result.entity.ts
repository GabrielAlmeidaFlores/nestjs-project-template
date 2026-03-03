import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { JudicialCaseAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity.props.interface';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JudicialCaseAnalysisResultEntity extends BaseEntity<JudicialCaseAnalysisResultId> {
  @Description('Nome do cliente.')
  public readonly clientName: string | null;

  @Description('Documento federal do cliente.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente.')
  public readonly clientBirthDate: Date | null;

  @Description('Data da última filiação do cliente.')
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Análise completa do caso judicial.')
  public readonly judicialCaseCompleteAnalysis: string | null;

  @Description('Análise simplificada do caso judicial.')
  public readonly judicialCaseSimplifiedAnalysis: string | null;

  protected readonly _type = JudicialCaseAnalysisResultEntity.name;

  public constructor(props: JudicialCaseAnalysisResultEntityPropsInterface) {
    super(JudicialCaseAnalysisResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.judicialCaseCompleteAnalysis =
      props.judicialCaseCompleteAnalysis ?? null;
    this.judicialCaseSimplifiedAnalysis =
      props.judicialCaseSimplifiedAnalysis ?? null;
  }
}
