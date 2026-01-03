import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GenerateMonthlyPaymentBillingRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public paymentPlanId: string;

  protected override readonly _type =
    GenerateMonthlyPaymentBillingRequestDto.name;
}
