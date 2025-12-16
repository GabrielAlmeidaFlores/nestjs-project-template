import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PaymentPlanPaidResourceDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public resource: string;

  @ResponseDtoStringProperty()
  public creditCost: string;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type = PaymentPlanPaidResourceDto.name;
}

@ResponseDto()
export class ListPaymentPlansResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoNumberProperty()
  public price: number;

  @ResponseDtoNumberProperty()
  public maxMemberCount: number;

  @ResponseDtoNumberProperty()
  public monthlyCreditAmount: number;

  @ResponseDtoBooleanProperty()
  public active: boolean;

  @ResponseDtoStringProperty()
  public cycle: string;

  @ResponseDtoObjectProperty(() => PaymentPlanPaidResourceDto, {
    isArray: true,
  })
  public paidResources: PaymentPlanPaidResourceDto[];

  protected override readonly _type = ListPaymentPlansResponseDto.name;
}
