import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { InsuranceQualityAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity.props.interface';
import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InsuranceQualityAnalysisResultEntity extends BaseEntity<InsuranceQualityAnalysisResultId> {
  @Description('Nome do cliente extraído do CNIS.')
  public readonly clientName: string | null;

  @Description('Documento federal do cliente extraído do CNIS.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente extraída do CNIS.')
  public readonly clientBirthDate: Date | null;

  @Description('Data da última filiação do cliente extraída do CNIS.')
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Conclusão sobre qualidade de segurado.')
  public readonly insuranceQualityConclusion: string | null;

  @Description('Conclusão sobre carência.')
  public readonly gracePeriodConclusion: string | null;

  @Description('Recomendação final.')
  public readonly finalRecommendation: string | null;

  @Description('Resumo da análise.')
  public readonly analysisSummary: string | null;

  protected readonly _type = InsuranceQualityAnalysisResultEntity.name;

  public constructor(
    props: InsuranceQualityAnalysisResultEntityPropsInterface,
  ) {
    super(InsuranceQualityAnalysisResultId, props);
    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.insuranceQualityConclusion = props.insuranceQualityConclusion ?? null;
    this.gracePeriodConclusion = props.gracePeriodConclusion ?? null;
    this.finalRecommendation = props.finalRecommendation ?? null;
    this.analysisSummary = props.analysisSummary ?? null;
  }
}
