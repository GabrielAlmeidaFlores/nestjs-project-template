import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ValidateOrganizationPaymentPlanStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public isActive: boolean;

  @ResponseDtoStringProperty()
  public lastPaymentStatus: string | null;

  @ResponseDtoDateProperty()
  public lastPaymentDate: Date | null;

  @ResponseDtoDateProperty()
  public nextDueDate: Date | null;

  @ResponseDtoStringProperty()
  public planName: string;

  @ResponseDtoStringProperty()
  public planDescription: string;

  @ResponseDtoNumberProperty()
  public planPrice: number;

  @ResponseDtoNumberProperty()
  public maxMemberCount: number;

  @ResponseDtoNumberProperty()
  public monthlyCreditAmount: number;

  @ResponseDtoBooleanProperty()
  public hasOverduePayments: boolean;

  @ResponseDtoNumberProperty()
  public overduePaymentsCount: number;

  protected override readonly _type =
    ValidateOrganizationPaymentPlanStatusResponseDto.name;
}
