import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { PerCapitaIncomeForBpcAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import type { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';

export class PerCapitaIncomeForBpcAnalysisEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisId> {
  @Description('Resultado da análise de renda per capita para BPC.')
  public readonly perCapitaIncomeForBpcAnalysisResult: PerCapitaIncomeForBpcAnalysisResultEntity | null;

  @Description(
    'Membros da família associados à análise de renda per capita para BPC.',
  )
  public readonly perCapitaIncomeForBpcAnalysisFamilyMember: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity[];

  @Description('Documentos associados à análise de renda per capita para BPC.')
  public readonly perCapitaIncomeForBpcAnalysisDocument: PerCapitaIncomeForBpcAnalysisDocumentEntity[];

  @Description('Registro da ferramenta de análise associado.')
  public readonly analysisToolRecord: AnalysisToolRecordEntity | null;

  @Description(
    'Membro da organização que criou a análise de renda per capita para BPC.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou a análise de renda per capita para BPC.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = PerCapitaIncomeForBpcAnalysisEntity.name;

  public constructor(props: PerCapitaIncomeForBpcAnalysisEntityPropsInterface) {
    super(PerCapitaIncomeForBpcAnalysisId, props);

    this.perCapitaIncomeForBpcAnalysisResult =
      props.perCapitaIncomeForBpcAnalysisResult ?? null;
    this.perCapitaIncomeForBpcAnalysisFamilyMember =
      props.perCapitaIncomeForBpcAnalysisFamilyMember ?? [];
    this.perCapitaIncomeForBpcAnalysisDocument =
      props.perCapitaIncomeForBpcAnalysisDocument ?? [];
    this.analysisToolRecord = props.analysisToolRecord ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
