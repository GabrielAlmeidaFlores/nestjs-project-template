import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.entity.props.interface';
import { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InsuranceQualityAnalysisLegalProceedingEntity extends BaseEntity<InsuranceQualityAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado à análise de qualidade de segurado.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Análise de qualidade de segurado associada ao processo judicial.',
  )
  public readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity;

  protected readonly _type = InsuranceQualityAnalysisLegalProceedingEntity.name;

  public constructor(
    props: InsuranceQualityAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(InsuranceQualityAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.insuranceQualityAnalysis = props.insuranceQualityAnalysis;
  }
}
