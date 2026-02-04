import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisResultEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisResultId> {
  @Description('Análise completa da renda per capita para BPC.')
  public readonly completeAnalysis: string | null;

  @Description('Análise simplificada da renda per capita para BPC.')
  public readonly simplifiedAnalysis: string | null;

  @Description('Análise de renda per capita para BPC associada.')
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;

  protected readonly _type = PerCapitaIncomeForBpcAnalysisResultEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisResultEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisResultId, props);

    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.perCapitaIncomeForBpcAnalysis = props.perCapitaIncomeForBpcAnalysis;
  }
}
