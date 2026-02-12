import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisDocumentEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisDocumentId> {
  @Description('Documento associado à análise de renda per capita para BPC.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum;

  @Description('Análise de renda per capita para BPC associada ao documento.')
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;

  protected readonly _type = PerCapitaIncomeForBpcAnalysisDocumentEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.perCapitaIncomeForBpcAnalysis = props.perCapitaIncomeForBpcAnalysis;
  }
}
