import { GetPaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan-paid-resource.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListPaymentPlanPaidResourcesResponseDto extends ListDataResponseDto<GetPaymentPlanPaidResourceResponseDto> {
  @ResponseDtoObjectProperty(() => GetPaymentPlanPaidResourceResponseDto, {
    isArray: true,
  })
  public override resource: GetPaymentPlanPaidResourceResponseDto[];

  protected override readonly _type =
    ListPaymentPlanPaidResourcesResponseDto.name;
}
