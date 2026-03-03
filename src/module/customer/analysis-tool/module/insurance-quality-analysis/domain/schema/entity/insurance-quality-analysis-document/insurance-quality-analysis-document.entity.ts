import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';
import { InsuranceQualityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/insurance-quality-analysis-document.entity.props.interface';
import { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InsuranceQualityAnalysisDocumentEntity extends BaseEntity<InsuranceQualityAnalysisDocumentId> {
  @Description('Documento relacionado à análise de qualidade de segurado.')
  public readonly document: string;

  @Description('Tipo do documento.')
  public readonly type: InsuranceQualityAnalysisDocumentTypeEnum;

  @Description('Análise de qualidade de segurado associada ao documento.')
  public readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity;

  protected readonly _type = InsuranceQualityAnalysisDocumentEntity.name;

  public constructor(
    props: InsuranceQualityAnalysisDocumentEntityPropsInterface,
  ) {
    super(InsuranceQualityAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.insuranceQualityAnalysis = props.insuranceQualityAnalysis;
  }
}
