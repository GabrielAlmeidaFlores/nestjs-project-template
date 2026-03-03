import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.entity.props.interface';
import { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InsuranceQualityAnalysisInssBenefitEntity extends BaseEntity<InsuranceQualityAnalysisInssBenefitId> {
  @Description(
    'Número do benefício INSS associado à análise de qualidade de segurado.',
  )
  public readonly inssBenefitNumber: string;

  @Description('Análise de qualidade de segurado associada ao benefício INSS.')
  public readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity;

  protected readonly _type = InsuranceQualityAnalysisInssBenefitEntity.name;

  public constructor(
    props: InsuranceQualityAnalysisInssBenefitEntityPropsInterface,
  ) {
    super(InsuranceQualityAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.insuranceQualityAnalysis = props.insuranceQualityAnalysis;
  }
}
