import { PaymentPlanSalesCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/payment-plan-sales-count-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PaymentPlanSalesCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => PaymentPlanSalesCountItemResponseDto, {
    isArray: true,
  })
  public paymentPlans: PaymentPlanSalesCountItemResponseDto[];

  protected override readonly _type = PaymentPlanSalesCountResponseDto.name;
}
