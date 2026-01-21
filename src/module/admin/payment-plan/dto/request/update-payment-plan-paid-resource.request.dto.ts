import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePaymentPlanPaidResourceRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({
    description:
      'Custo em créditos do recurso pago. Deve ser um valor positivo.',
    required: false,
  })
  public creditCost?: number;

  @RequestDtoStringProperty({
    description:
      'Descrição do recurso pago. Explica para que serve este recurso.',
    required: false,
  })
  public description?: string;

  @RequestDtoStringProperty({
    description: 'Título do recurso pago.',
    required: false,
  })
  public title?: string;

  @RequestDtoStringProperty({
    description:
      'Prompt configurado para o recurso pago de IA. Se fornecido, cria ou atualiza a configuração de IA automaticamente.',
    required: false,
  })
  public prompt?: string;

  protected override readonly _type =
    UpdatePaymentPlanPaidResourceRequestDto.name;
}
