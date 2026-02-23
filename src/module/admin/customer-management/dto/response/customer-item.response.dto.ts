import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CustomerItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId, {
    description: 'Identificador único do usuário no sistema',
  })
  public customerId: CustomerId;

  @ResponseDtoStringProperty({
    description: 'Nome completo do usuário',
  })
  public customerName: string;

  @ResponseDtoValueObjectProperty(Email, {
    description: 'Endereço de e-mail do usuário',
  })
  public customerEmail: Email;

  @ResponseDtoValueObjectProperty(FederalDocument, {
    description: 'CPF ou CNPJ do usuário',
  })
  public customerDocument: FederalDocument;

  @ResponseDtoStringProperty({
    required: false,
    description: 'Nome do plano de pagamento contratado pelo usuário',
  })
  public currentPaymentPlanName?: string;

  @ResponseDtoValueObjectProperty(DecimalValue, {
    required: false,
    description: 'Valor do plano de pagamento contratado',
  })
  public currentPaymentPlanValue?: DecimalValue;

  @ResponseDtoDateProperty({
    description: 'Data e hora de cadastro do usuário no sistema',
  })
  public customerCreatedAt: Date;

  @ResponseDtoEnumProperty(CustomerTypeEnum, {
    description:
      'Tipo de usuário: INDIVIDUAL (usuário único sem organização ou dono de organização sem colaboradores), ORGANIZATION (dono de organização com múltiplos usuários), COLLABORATOR (colaborador de uma organização)',
  })
  public customerType: CustomerTypeEnum;

  @ResponseDtoStringProperty({
    required: false,
    description:
      'Nome da organização à qual o usuário pertence (quando aplicável)',
  })
  public organizationName?: string;

  @ResponseDtoBooleanProperty({
    description:
      'Indica se o usuário possui assinatura ativa de um plano de pagamento',
  })
  public hasActiveSubscription: boolean;

  protected override readonly _type = CustomerItemResponseDto.name;
}
