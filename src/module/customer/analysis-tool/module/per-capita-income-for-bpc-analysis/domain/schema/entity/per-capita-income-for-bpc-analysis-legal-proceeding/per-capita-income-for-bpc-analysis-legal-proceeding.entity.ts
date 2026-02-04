import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisLegalProceedingEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado à análise de renda per capita para BPC.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Análise de renda per capita para BPC associada ao processo judicial.',
  )
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;

  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisLegalProceedingEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.perCapitaIncomeForBpcAnalysis = props.perCapitaIncomeForBpcAnalysis;
  }
}
