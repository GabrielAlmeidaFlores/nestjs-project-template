import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPaymentPlanPaidResourceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanPaidResourceId, {
    description: 'Identificador único do recurso pago.',
  })
  public id: PaymentPlanPaidResourceId;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, {
    description:
      'Tipo de recurso pago. Exemplo: LEGAL_PLEADING_COMPLETE_ANALYSIS, CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS.',
  })
  public resource: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoNumberProperty({
    description:
      'Custo em créditos do recurso pago. Representa quantos créditos são necessários para utilizar este recurso.',
  })
  public creditCost: number;

  @ResponseDtoStringProperty({
    description: 'Título do recurso pago. Nome curto e descritivo do recurso.',
  })
  public title: string;

  @ResponseDtoStringProperty({
    description:
      'Descrição do recurso pago. Explica para que serve e como funciona.',
  })
  public description: string;

  @ResponseDtoStringProperty({
    required: false,
    description:
      'Prompt configurado para o recurso pago de IA. Retorna undefined se não houver configuração de IA.',
  })
  public prompt?: string;

  @ResponseDtoDateProperty({
    description: 'Data da última atualização do recurso pago.',
  })
  public updatedAt: Date;

  protected override readonly _type =
    GetPaymentPlanPaidResourceResponseDto.name;
}
