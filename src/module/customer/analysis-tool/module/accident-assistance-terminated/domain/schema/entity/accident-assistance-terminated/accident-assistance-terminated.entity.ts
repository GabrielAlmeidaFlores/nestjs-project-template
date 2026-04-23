import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AccidentAssistanceTerminatedEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity.props.interface';
import type { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import type { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import type { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import type { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';
import type { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import type { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';

export class AccidentAssistanceTerminatedEntity extends BaseEntity<AccidentAssistanceTerminatedId> {
  @Description('Data de Encaminhamento/Requerimento (DER) do benefício.')
  public readonly der: Date;

  @Description('Data de indeferimento/cessação do benefício.')
  public readonly denialDate: Date;

  @Description('Categoria do segurado.')
  public readonly category: AccidentAssistanceTerminatedCategoryEnum;

  @Description('Senha do INSS do segurado (criptografada).')
  public readonly inssPassword: string | null;

  @Description('Nome da análise.')
  public readonly analysisName: string | null;

  @Description('Motivo da cessação do benefício.')
  public readonly benefitCessationReason: string;

  @Description('Indica se o segurado teve benefício anterior de incapacidade.')
  public readonly hadPreviousIncapacityBenefit: boolean;

  @Description('Número do benefício anterior de incapacidade.')
  public readonly previousIncapacityBenefitNumber: string | null;

  @Description('Data de início do benefício anterior de incapacidade.')
  public readonly previousIncapacityBenefitStartDate: Date | null;

  @Description('Data de término do benefício anterior de incapacidade.')
  public readonly previousIncapacityBenefitEndDate: Date | null;

  @Description('Status do pedido de prorrogação.')
  public readonly extensionRequestStatus: AccidentAssistanceTerminatedExtensionRequestStatusEnum | null;

  @Description('Resultado da análise de auxílio-acidente cessado.')
  public readonly accidentAssistanceTerminatedResult: AccidentAssistanceTerminatedResultEntity | null;

  @Description('Benefícios associados à análise de auxílio-acidente cessado.')
  public readonly accidentAssistanceTerminatedBenefit: AccidentAssistanceTerminatedBenefitEntity[];

  @Description(
    'Processos judiciais associados à análise de auxílio-acidente cessado.',
  )
  public readonly accidentAssistanceTerminatedLegalProceeding: AccidentAssistanceTerminatedLegalProceedingEntity[];

  @Description('Documentos associados à análise de auxílio-acidente cessado.')
  public readonly accidentAssistanceTerminatedDocument: AccidentAssistanceTerminatedDocumentEntity[];

  @Description(
    'Membro da organização que criou a análise de auxílio-acidente cessado.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou a análise de auxílio-acidente cessado.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AccidentAssistanceTerminatedEntity.name;

  public constructor(props: AccidentAssistanceTerminatedEntityPropsInterface) {
    super(AccidentAssistanceTerminatedId, props);

    this.der = props.der;
    this.denialDate = props.denialDate;
    this.category = props.category;
    this.inssPassword = props.inssPassword ?? null;
    this.analysisName = props.analysisName ?? null;
    this.benefitCessationReason = props.benefitCessationReason;
    this.hadPreviousIncapacityBenefit = props.hadPreviousIncapacityBenefit;
    this.previousIncapacityBenefitNumber =
      props.previousIncapacityBenefitNumber ?? null;
    this.previousIncapacityBenefitStartDate =
      props.previousIncapacityBenefitStartDate ?? null;
    this.previousIncapacityBenefitEndDate =
      props.previousIncapacityBenefitEndDate ?? null;
    this.extensionRequestStatus = props.extensionRequestStatus ?? null;
    this.accidentAssistanceTerminatedResult =
      props.accidentAssistanceTerminatedResult ?? null;
    this.accidentAssistanceTerminatedBenefit =
      props.accidentAssistanceTerminatedBenefit ?? [];
    this.accidentAssistanceTerminatedLegalProceeding =
      props.accidentAssistanceTerminatedLegalProceeding ?? [];
    this.accidentAssistanceTerminatedDocument =
      props.accidentAssistanceTerminatedDocument ?? [];
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
