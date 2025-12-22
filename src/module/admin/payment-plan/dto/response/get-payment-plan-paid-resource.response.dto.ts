import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPaymentPlanPaidResourceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Identificador único do recurso pago.',
  })
  public id: string;

  @ResponseDtoStringProperty({
    description:
      'Tipo de recurso pago. Exemplo: LEGAL_PLEADING_COMPLETE_ANALYSIS, CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS.',
  })
  public resource: string;

  @ResponseDtoNumberProperty({
    description:
      'Custo em créditos do recurso pago. Representa quantos créditos são necessários para utilizar este recurso.',
  })
  public creditCost: number;

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

  protected override readonly _type =
    GetPaymentPlanPaidResourceResponseDto.name;
}
