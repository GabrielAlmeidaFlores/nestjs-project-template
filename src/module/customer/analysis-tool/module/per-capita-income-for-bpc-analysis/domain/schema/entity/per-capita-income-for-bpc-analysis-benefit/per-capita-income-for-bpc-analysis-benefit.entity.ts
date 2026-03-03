import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisBenefitEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisBenefitId> {
  @Description(
    'Número do benefício INSS associado à análise de renda per capita para BPC.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'Análise de renda per capita para BPC associada ao benefício INSS.',
  )
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;

  protected readonly _type = PerCapitaIncomeForBpcAnalysisBenefitEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisBenefitEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.perCapitaIncomeForBpcAnalysis = props.perCapitaIncomeForBpcAnalysis;
  }
}
