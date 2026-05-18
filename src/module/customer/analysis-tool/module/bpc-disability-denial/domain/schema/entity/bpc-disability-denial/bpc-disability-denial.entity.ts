import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcDisabilityDenialEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity.props.interface';
import type { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';
import type { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import type { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import type { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import type { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';

export class BpcDisabilityDenialEntity extends BaseEntity<BpcDisabilityDenialId> {
  @Description(
    'Nome da análise de indeferimento de BPC Pessoa com Deficiência.',
  )
  public readonly analysisName: string | null;

  @Description('Data de entrada do requerimento no INSS.')
  public readonly requestEntryDate: Date | null;

  @Description('Data do indeferimento do benefício.')
  public readonly denialDate: Date | null;

  @Description('Tipo de benefício requerido perante o INSS.')
  public readonly requestedBenefitType: string | null;

  @Description('Categoria informada para o requerente no fluxo.')
  public readonly category: BpcDisabilityDenialCategoryEnum | null;

  @Description('Motivo principal do indeferimento informado no fluxo.')
  public readonly denialReason: BpcDisabilityDenialDenialReasonEnum | null;

  @Description('Descrição livre do motivo do indeferimento.')
  public readonly denialReasonDescription: string | null;

  @Description('Tipo de deficiência informado para o requerente.')
  public readonly disabilityType: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;

  @Description('Grau da deficiência informado para o requerente.')
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum | null;

  @Description('Data estimada do início da deficiência.')
  public readonly estimatedDisabilityStartDate: Date | null;

  @Description('Requerente frequenta escola ou curso técnico.')
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;

  @Description('Requerente realiza atividade laboral.')
  public readonly performsLaborActivity: boolean | null;

  @Description('Requerente necessita de ajuda de terceiros.')
  public readonly needsThirdPartyHelp: boolean | null;

  @Description('Requerente possui acesso a serviços básicos.')
  public readonly hasAccessToBasicServices: boolean | null;

  @Description('Outras barreiras sociais relevantes do caso.')
  public readonly otherBarriersDescription: string | null;

  @Description('Indica se o requerente mora sozinho.')
  public readonly livesAlone: boolean | null;

  @Description('Resultado da análise de indeferimento de BPC PcD.')
  public readonly bpcDisabilityDenialResult: BpcDisabilityDenialResultEntity | null;

  @Description('Membros da família associados à análise de BPC ao Idoso.')
  public readonly bpcDisabilityDenialFamilyMember: BpcDisabilityDenialFamilyMemberEntity[];

  @Description('Documentos associados à análise de BPC ao Idoso.')
  public readonly bpcDisabilityDenialDocument: BpcDisabilityDenialDocumentEntity[];

  @Description('Benefícios INSS associados à análise de BPC ao Idoso.')
  public readonly bpcDisabilityDenialInssBenefit: BpcDisabilityDenialInssBenefitEntity[];

  @Description('Processos judiciais associados à análise de BPC ao Idoso.')
  public readonly bpcDisabilityDenialLegalProceeding: BpcDisabilityDenialLegalProceedingEntity[];

  @Description('Registro da ferramenta de análise associado.')
  public readonly analysisToolRecord: AnalysisToolRecordEntity | null;

  @Description('Membro da organização que criou a análise de BPC ao Idoso.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise de BPC ao Idoso.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = BpcDisabilityDenialEntity.name;

  public constructor(props: BpcDisabilityDenialEntityPropsInterface) {
    super(BpcDisabilityDenialId, props);

    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.requestedBenefitType = props.requestedBenefitType ?? null;
    this.category = props.category ?? null;
    this.denialReason = props.denialReason ?? null;
    this.denialReasonDescription = props.denialReasonDescription ?? null;
    this.disabilityType = props.disabilityType ?? null;
    this.disabilityDegree = props.disabilityDegree ?? null;
    this.estimatedDisabilityStartDate =
      props.estimatedDisabilityStartDate ?? null;
    this.attendsSchoolOrTechnicalCourse =
      props.attendsSchoolOrTechnicalCourse ?? null;
    this.performsLaborActivity = props.performsLaborActivity ?? null;
    this.needsThirdPartyHelp = props.needsThirdPartyHelp ?? null;
    this.hasAccessToBasicServices = props.hasAccessToBasicServices ?? null;
    this.otherBarriersDescription = props.otherBarriersDescription ?? null;
    this.livesAlone = props.livesAlone ?? null;
    this.bpcDisabilityDenialResult = props.bpcDisabilityDenialResult ?? null;
    this.bpcDisabilityDenialFamilyMember =
      props.bpcDisabilityDenialFamilyMember ?? [];
    this.bpcDisabilityDenialDocument = props.bpcDisabilityDenialDocument ?? [];
    this.bpcDisabilityDenialInssBenefit =
      props.bpcDisabilityDenialInssBenefit ?? [];
    this.bpcDisabilityDenialLegalProceeding =
      props.bpcDisabilityDenialLegalProceeding ?? [];
    this.analysisToolRecord = props.analysisToolRecord ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
