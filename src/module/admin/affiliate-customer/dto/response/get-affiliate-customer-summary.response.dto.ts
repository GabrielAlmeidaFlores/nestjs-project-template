import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAffiliateCustomerSummaryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({
    description:
      'Número de conversões (assinaturas geradas pelo link do afiliado)',
  })
  public conversions: number;

  @ResponseDtoNumberProperty({
    description: 'Total ganho no último mês (transferências concluídas)',
  })
  public earningsLastMonth: number;

  @ResponseDtoNumberProperty({
    description: 'Total ganho nos últimos 365 dias (transferências concluídas)',
  })
  public earningsLast365Days: number;

  @ResponseDtoNumberProperty({
    description:
      'Valor a receber (transferências pendentes ou em processamento)',
  })
  public pendingAmount: number;

  protected override readonly _type =
    GetAffiliateCustomerSummaryResponseDto.name;
}
