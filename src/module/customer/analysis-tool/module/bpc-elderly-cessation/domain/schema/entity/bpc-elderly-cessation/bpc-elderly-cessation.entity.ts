import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcElderlyCessationEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity.props.interface';
import type { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';
import type { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import type { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import type { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import type { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';

export class BpcElderlyCessationEntity extends BaseEntity<BpcElderlyCessationId> {
  @Description('Nome da análise de cessação ou suspensão de BPC ao Idoso.')
  public readonly analysisName: string | null;

  @Description('Data da decisão de cessação ou suspensão do benefício.')
  public readonly decisionDate: Date | null;

  @Description('Número do benefício anterior no INSS.')
  public readonly previousInssBenefitNumber: string | null;

  @Description('Categoria informada para o requerente no fluxo.')
  public readonly category: BpcElderlyCessationCategoryEnum | null;

  @Description('Motivo principal da cessação ou suspensão informado no fluxo.')
  public readonly cessationReason: BpcElderlyCessationCessationReasonEnum | null;

  @Description('Descrição livre do motivo da cessação ou suspensão.')
  public readonly cessationReasonDescription: string | null;

  @Description('Indica se o prazo recursal está expirado.')
  public readonly isAppealDeadlineExpired: boolean | null;

  @Description('Senha do Meu INSS informada pelo usuário.')
  public readonly myInssPassword: string | null;

  @Description('Estado civil informado para o requerente.')
  public readonly civilStatus: BpcElderlyCessationCivilStatusEnum | null;

  @Description('Escolaridade informada para o requerente.')
  public readonly educationLevel: BpcElderlyCessationEducationLevelEnum | null;

  @Description('Endereço atual informado no fluxo.')
  public readonly currentAddress: string | null;

  @Description('Endereço anterior informado no fluxo.')
  public readonly previousAddress: string | null;

  @Description('Indica se houve alteração de endereço desde a decisão.')
  public readonly hasAddressChangedSinceDecision: boolean | null;

  @Description('Indica se o requerente mora sozinho.')
  public readonly livesAlone: boolean | null;

  @Description('Resultado da análise de cessação ou suspensão de BPC ao Idoso.')
  public readonly bpcElderlyCessationResult: BpcElderlyCessationResultEntity | null;

  @Description('Membros da família associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyCessationFamilyMember: BpcElderlyCessationFamilyMemberEntity[];

  @Description('Documentos associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyCessationDocument: BpcElderlyCessationDocumentEntity[];

  @Description('Benefícios INSS associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyCessationInssBenefit: BpcElderlyCessationInssBenefitEntity[];

  @Description('Processos judiciais associados à análise de BPC ao Idoso.')
  public readonly bpcElderlyCessationLegalProceeding: BpcElderlyCessationLegalProceedingEntity[];

  @Description('Registro da ferramenta de análise associado.')
  public readonly analysisToolRecord: AnalysisToolRecordEntity | null;

  @Description('Membro da organização que criou a análise de BPC ao Idoso.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise de BPC ao Idoso.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = BpcElderlyCessationEntity.name;

  public constructor(props: BpcElderlyCessationEntityPropsInterface) {
    super(BpcElderlyCessationId, props);

    this.analysisName = props.analysisName ?? null;
    this.decisionDate = props.decisionDate ?? null;
    this.previousInssBenefitNumber = props.previousInssBenefitNumber ?? null;
    this.category = props.category ?? null;
    this.cessationReason = props.cessationReason ?? null;
    this.cessationReasonDescription = props.cessationReasonDescription ?? null;
    this.isAppealDeadlineExpired = props.isAppealDeadlineExpired ?? null;
    this.myInssPassword = props.myInssPassword ?? null;
    this.civilStatus = props.civilStatus ?? null;
    this.educationLevel = props.educationLevel ?? null;
    this.currentAddress = props.currentAddress ?? null;
    this.previousAddress = props.previousAddress ?? null;
    this.hasAddressChangedSinceDecision =
      props.hasAddressChangedSinceDecision ?? null;
    this.livesAlone = props.livesAlone ?? null;
    this.bpcElderlyCessationResult = props.bpcElderlyCessationResult ?? null;
    this.bpcElderlyCessationFamilyMember =
      props.bpcElderlyCessationFamilyMember ?? [];
    this.bpcElderlyCessationDocument = props.bpcElderlyCessationDocument ?? [];
    this.bpcElderlyCessationInssBenefit =
      props.bpcElderlyCessationInssBenefit ?? [];
    this.bpcElderlyCessationLegalProceeding =
      props.bpcElderlyCessationLegalProceeding ?? [];
    this.analysisToolRecord = props.analysisToolRecord ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
