import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import type { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import type { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import type { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import type { JudicialCaseAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity.props.interface';

export class JudicialCaseAnalysisEntity extends BaseEntity<JudicialCaseAnalysisId> {
  @Description('Resultado do caso judicial.')
  public readonly judicialCaseAnalysisResult: JudicialCaseAnalysisResultEntity | null;

  @Description('Benefícios INSS associados ao caso judicial.')
  public readonly judicialCaseAnalysisBenefit?: JudicialCaseAnalysisBenefitEntity[];

  @Description('Processos judiciais associados ao caso judicial.')
  public readonly judicialCaseAnalysisLegalProceeding?: JudicialCaseAnalysisLegalProceedingEntity[];

  @Description('Documentos do caso judicial.')
  public readonly judicialCaseAnalysisDocument?: JudicialCaseAnalysisDocumentEntity[];

  @Description('Membro da organização que criou o caso judicial.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou o caso judicial.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = JudicialCaseAnalysisEntity.name;

  public constructor(props: JudicialCaseAnalysisEntityPropsInterface) {
    super(JudicialCaseAnalysisId, props);

    this.judicialCaseAnalysisResult =
      props.judicialCaseAnalysisResult ?? null;
    this.judicialCaseAnalysisBenefit = props.judicialCaseAnalysisBenefit ?? [];
    this.judicialCaseAnalysisLegalProceeding =
      props.judicialCaseAnalysisLegalProceeding ?? [];
    this.judicialCaseAnalysisDocument = props.judicialCaseAnalysisDocument ?? [];
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}

