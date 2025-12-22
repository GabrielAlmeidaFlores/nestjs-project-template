import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreditCardInfoRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ description: 'Nome do titular do cartão' })
  public holderName: string;

  @RequestDtoStringProperty({ description: 'Número do cartão de crédito' })
  public number: string;

  @RequestDtoStringProperty({ description: 'Mês de expiração (MM)' })
  public expiryMonth: string;

  @RequestDtoStringProperty({ description: 'Ano de expiração (YYYY)' })
  public expiryYear: string;

  @RequestDtoStringProperty({ description: 'Código de segurança do cartão' })
  public ccv: string;

  protected override readonly _type = CreditCardInfoRequestDto.name;
}

@RequestDto()
export class CreditCardHolderInfoRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ description: 'Nome completo do titular' })
  public name: string;

  @RequestDtoValueObjectProperty(Email, { description: 'Email do titular' })
  public email: Email;

  @RequestDtoValueObjectProperty(FederalDocument, {
    description: 'CPF/CNPJ do titular',
  })
  public federalDocument: FederalDocument;

  @RequestDtoValueObjectProperty(PostalCode, { description: 'CEP do endereço' })
  public postalCode: PostalCode;

  @RequestDtoStringProperty({ description: 'Número do endereço' })
  public addressNumber: string;

  @RequestDtoValueObjectProperty(PhoneNumber, {
    description: 'Telefone do titular',
  })
  public phoneNumber: PhoneNumber;

  protected override readonly _type = CreditCardHolderInfoRequestDto.name;
}
