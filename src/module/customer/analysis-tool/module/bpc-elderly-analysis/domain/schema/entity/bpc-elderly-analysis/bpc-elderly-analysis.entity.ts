import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisResultCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/enum/bpc-elderly-analysis-result-category.enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcElderlyAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity.props.interface';
import type { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import type { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import type { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import type { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import type { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';

export class BpcElderlyAnalysisEntity extends BaseEntity<BpcElderlyAnalysisId> {
  @Description('Nome da análise de BPC ao Idoso.')
  public readonly name: string | null;

  @Description('Categoria do trabalhador para o BPC ao Idoso.')
  public readonly category: BpcElderlyAnalysisResultCategoryEnum | null;

  @Description('Resultado da análise de BPC ao Idoso.')
  public readonly bpcElderlyAnalysisResult: BpcElderlyAnalysisResultEntity | null;

  @Description('Membros da família associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyAnalysisFamilyMember: BpcElderlyAnalysisFamilyMemberEntity[];

  @Description('Documentos associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyAnalysisDocument: BpcElderlyAnalysisDocumentEntity[];

  @Description('Benefícios INSS associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyAnalysisInssBenefit: BpcElderlyAnalysisInssBenefitEntity[];

  @Description('Processos judiciais associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyAnalysisLegalProceeding: BpcElderlyAnalysisLegalProceedingEntity[];

  @Description('Registro da ferramenta de análise associado.')
  public readonly analysisToolRecord: AnalysisToolRecordEntity | null;

  @Description('Membro da organização que criou a análise de BPC ao Idoso.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise de BPC ao Idoso.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = BpcElderlyAnalysisEntity.name;

  public constructor(props: BpcElderlyAnalysisEntityPropsInterface) {
    super(BpcElderlyAnalysisId, props);

    this.name = props.name ?? null;
    this.category = props.category ?? null;
    this.bpcElderlyAnalysisResult = props.bpcElderlyAnalysisResult ?? null;
    this.bpcElderlyAnalysisFamilyMember =
      props.bpcElderlyAnalysisFamilyMember ?? [];
    this.bpcElderlyAnalysisDocument = props.bpcElderlyAnalysisDocument ?? [];
    this.bpcElderlyAnalysisInssBenefit =
      props.bpcElderlyAnalysisInssBenefit ?? [];
    this.bpcElderlyAnalysisLegalProceeding =
      props.bpcElderlyAnalysisLegalProceeding ?? [];
    this.analysisToolRecord = props.analysisToolRecord ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
