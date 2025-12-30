import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListPaymentPlansResponseDto extends ListDataResponseDto<GetPaymentPlanResponseDto> {
  @ResponseDtoObjectProperty(() => GetPaymentPlanResponseDto, {
    isArray: true,
  })
  public override resource: GetPaymentPlanResponseDto[];

  protected override readonly _type = ListPaymentPlansResponseDto.name;
}
