import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolRecordEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

export class AnalysisToolRecordEntity extends BaseEntity<AnalysisToolRecordId> {
  @Description('Status do registro da ferramenta de análise')
  public readonly status: AnalysisStatusEnum;

  @Description('Código de identificação do registro da ferramenta de análise')
  public readonly code: AnalysisToolRecordCode;

  @Description('Tipo do registro da ferramenta de análise')
  public readonly type: AnalysisToolRecordTypeEnum;

  @Description(
    'Análise rápida do CNIS associada ao registro da ferramenta de análise',
  )
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity | null;

  @Description(
    'Registro de planejamento de aposentadoria RPPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity | null;

  @Description(
    'Planejamento de aposentadoria RGPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  @Description(
    'Atividade especial associada ao registro da ferramenta de análise',
  )
  public readonly specialActivity: SpecialActivityEntity | null;

  @Description(
    'Análise de caso judicial associada ao registro da ferramenta de análise',
  )
  public readonly judicialCaseAnalysis: JudicialCaseAnalysisEntity | null;

  @Description(
    'Análise administrativa do INSS associada ao registro da ferramenta de análise',
  )
  public readonly administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity | null;

  @Description(
    'Análise geradora de objeção de laudo médico e social associada ao registro da ferramenta de análise',
  )
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity | null;

  @Description(
    'Avaliação de deficiência para BPC associada ao registro da ferramenta de análise',
  )
  public readonly disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity | null;

  @Description(
    'Cliente da ferramenta de análise associado ao registro da ferramenta de análise',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description(
    'Membro da organização que criou o registro da ferramenta de análise.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o registro da ferramenta de análise.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolRecordEntity.name;

  public constructor(props: AnalysisToolRecordEntityPropsInterface) {
    super(AnalysisToolRecordId, props);

    this.code = props.code;
    this.type = props.type;
    this.cnisFastAnalysis = props.cnisFastAnalysis ?? null;
    this.retirementPlanningRpps = props.retirementPlanningRpps ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
    this.specialActivity = props.specialActivity ?? null;
    this.judicialCaseAnalysis = props.judicialCaseAnalysis ?? null;
    this.administrativeProcedureInssAnalysis =
      props.administrativeProcedureInssAnalysis ?? null;
    this.medicalAndSocialReportObjectionGeneratorAnalysis =
      props.medicalAndSocialReportObjectionGeneratorAnalysis ?? null;
    this.disabilityAssessmentForBpcAnalysis =
      props.disabilityAssessmentForBpcAnalysis ?? null;
    this.status = props.status;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
