import { PaymentPlanItemResponseDto } from '@module/customer/payment-plan/dto/response/payment-plan-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListPaymentPlansResponseDto extends ListDataResponseDto<PaymentPlanItemResponseDto> {
  @ResponseDtoObjectProperty(() => PaymentPlanItemResponseDto, {
    isArray: true,
  })
  public override resource: PaymentPlanItemResponseDto[];

  protected override readonly _type = ListPaymentPlansResponseDto.name;
}

export { PaymentPlanPaidResourceDto } from '@module/customer/payment-plan/dto/response/payment-plan-item.response.dto';
