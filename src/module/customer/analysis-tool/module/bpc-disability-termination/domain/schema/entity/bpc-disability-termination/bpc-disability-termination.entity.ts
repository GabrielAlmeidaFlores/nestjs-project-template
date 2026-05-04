import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcDisabilityTerminationEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity.props.interface';
import type { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import type { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';
import type { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import type { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import type { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import type { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';

export class BpcDisabilityTerminationEntity extends BaseEntity<BpcDisabilityTerminationId> {
  @Description('Nome da análise de BPC Pessoa com Deficiência cessado.')
  public readonly analysisName: string | null;

  @Description('Categoria informada para o requerente no fluxo.')
  public readonly category: BpcDisabilityTerminationCategoryEnum | null;

  @Description('Tipo de deficiência informado para o requerente.')
  public readonly disabilityType: BpcDisabilityTerminationDisabilityTypeEnum | null;

  @Description('Grau da deficiência informado para o requerente.')
  public readonly disabilityDegree: BpcDisabilityTerminationDisabilityDegreeEnum | null;

  @Description('Motivo da cessação do benefício.')
  public readonly benefitCessationReason: string | null;

  @Description('Indica se o requerente mora sozinho.')
  public readonly livesAlone: boolean | null;

  @Description('Resultado da análise de BPC PcD cessado.')
  public readonly bpcDisabilityTerminationResult: BpcDisabilityTerminationResultEntity | null;

  @Description('Avaliação da deficiência associada à análise.')
  public readonly bpcDisabilityTerminationDisabilityAssessment: BpcDisabilityTerminationDisabilityAssessmentEntity | null;

  @Description('Membros da família associados à análise de BPC PcD cessado.')
  public readonly bpcDisabilityTerminationFamilyMember: BpcDisabilityTerminationFamilyMemberEntity[];

  @Description('Documentos associados à análise de BPC PcD cessado.')
  public readonly bpcDisabilityTerminationDocument: BpcDisabilityTerminationDocumentEntity[];

  @Description('Benefícios INSS associados à análise de BPC PcD cessado.')
  public readonly bpcDisabilityTerminationInssBenefit: BpcDisabilityTerminationInssBenefitEntity[];

  @Description('Processos judiciais associados à análise de BPC PcD cessado.')
  public readonly bpcDisabilityTerminationLegalProceeding: BpcDisabilityTerminationLegalProceedingEntity[];

  @Description('Registro da ferramenta de análise associado.')
  public readonly analysisToolRecord: AnalysisToolRecordEntity | null;

  @Description('Membro da organização que criou a análise.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = BpcDisabilityTerminationEntity.name;

  public constructor(props: BpcDisabilityTerminationEntityPropsInterface) {
    super(BpcDisabilityTerminationId, props);

    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.disabilityType = props.disabilityType ?? null;
    this.disabilityDegree = props.disabilityDegree ?? null;
    this.benefitCessationReason = props.benefitCessationReason ?? null;
    this.livesAlone = props.livesAlone ?? null;
    this.bpcDisabilityTerminationResult =
      props.bpcDisabilityTerminationResult ?? null;
    this.bpcDisabilityTerminationDisabilityAssessment =
      props.bpcDisabilityTerminationDisabilityAssessment ?? null;
    this.bpcDisabilityTerminationFamilyMember =
      props.bpcDisabilityTerminationFamilyMember ?? [];
    this.bpcDisabilityTerminationDocument =
      props.bpcDisabilityTerminationDocument ?? [];
    this.bpcDisabilityTerminationInssBenefit =
      props.bpcDisabilityTerminationInssBenefit ?? [];
    this.bpcDisabilityTerminationLegalProceeding =
      props.bpcDisabilityTerminationLegalProceeding ?? [];
    this.analysisToolRecord = props.analysisToolRecord ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
