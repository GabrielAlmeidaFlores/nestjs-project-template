import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/enum/bpc-disability-grant-category.enum';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { BpcDisabilityGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity.props.interface';
import type { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import type { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import type { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import type { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import type { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';

export class BpcDisabilityGrantEntity extends BaseEntity<BpcDisabilityGrantId> {
  @Description(
    'Nome da anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia.',
  )
  public readonly analysisName: string | null;

  @Description('Data de entrada do requerimento no INSS.')
  public readonly requestEntryDate: Date | null;

  @Description('Data do indeferimento do benefÃ­cio.')
  public readonly denialDate: Date | null;

  @Description('Tipo de benefÃ­cio requerido perante o INSS.')
  public readonly requestedBenefitType: string | null;

  @Description('Categoria informada para o requerente no fluxo.')
  public readonly category: BpcDisabilityGrantCategoryEnum | null;

  @Description('Tipo de deficiÃªncia informado para o requerente.')
  public readonly disabilityType: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;

  @Description('Grau da deficiÃªncia informado para o requerente.')
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum | null;

  @Description('Data estimada do inÃ­cio da deficiÃªncia.')
  public readonly estimatedDisabilityStartDate: Date | null;

  @Description('Requerente frequenta escola ou curso tÃ©cnico.')
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;

  @Description('Requerente realiza atividade laboral.')
  public readonly performsLaborActivity: boolean | null;

  @Description('Requerente necessita de ajuda de terceiros.')
  public readonly needsThirdPartyHelp: boolean | null;

  @Description('Requerente possui acesso a serviÃ§os bÃ¡sicos.')
  public readonly hasAccessToBasicServices: boolean | null;

  @Description('Outras barreiras sociais relevantes do caso.')
  public readonly otherBarriersDescription: string | null;

  @Description('Resultado da anÃ¡lise de indeferimento de BPC PcD.')
  public readonly BpcDisabilityGrantResult: BpcDisabilityGrantResultEntity | null;

  @Description('Membros da famÃ­lia associados Ã  anÃ¡lise de BPC ao Idoso.')
  public readonly BpcDisabilityGrantFamilyMember: BpcDisabilityGrantFamilyMemberEntity[];

  @Description('Documentos associados Ã  anÃ¡lise de BPC ao Idoso.')
  public readonly BpcDisabilityGrantDocument: BpcDisabilityGrantDocumentEntity[];

  @Description('BenefÃ­cios INSS associados Ã  anÃ¡lise de BPC ao Idoso.')
  public readonly BpcDisabilityGrantInssBenefit: BpcDisabilityGrantInssBenefitEntity[];

  @Description('Processos judiciais associados Ã  anÃ¡lise de BPC ao Idoso.')
  public readonly BpcDisabilityGrantLegalProceeding: BpcDisabilityGrantLegalProceedingEntity[];

  @Description('Registro da ferramenta de anÃ¡lise associado.')
  public readonly analysisToolRecordId: AnalysisToolRecordId | null;

  @Description('Membro da organizaÃ§Ã£o que criou a anÃ¡lise de BPC ao Idoso.')
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organizaÃ§Ã£o que atualizou a anÃ¡lise de BPC ao Idoso.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = BpcDisabilityGrantEntity.name;

  public constructor(props: BpcDisabilityGrantEntityPropsInterface) {
    super(BpcDisabilityGrantId, props);

    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.requestedBenefitType = props.requestedBenefitType ?? null;
    this.category = props.category ?? null;
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
    this.BpcDisabilityGrantResult = props.BpcDisabilityGrantResult ?? null;
    this.BpcDisabilityGrantFamilyMember =
      props.BpcDisabilityGrantFamilyMember ?? [];
    this.BpcDisabilityGrantDocument = props.BpcDisabilityGrantDocument ?? [];
    this.BpcDisabilityGrantInssBenefit =
      props.BpcDisabilityGrantInssBenefit ?? [];
    this.BpcDisabilityGrantLegalProceeding =
      props.BpcDisabilityGrantLegalProceeding ?? [];
    this.analysisToolRecordId = props.analysisToolRecordId ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
