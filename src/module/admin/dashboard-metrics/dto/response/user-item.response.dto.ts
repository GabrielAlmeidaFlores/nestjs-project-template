import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DashboardSubscriptionStatusEnum } from '@module/admin/dashboard-metrics/dto/response/enum/dashboard-subscription-status.enum';
import { DashboardUserTypeEnum } from '@module/admin/dashboard-metrics/dto/response/enum/dashboard-user-type.enum';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UserItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  @ResponseDtoValueObjectProperty(FederalDocument)
  public federalDocument: FederalDocument;

  @ResponseDtoValueObjectProperty(PhoneNumber)
  public phoneNumber: PhoneNumber;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoNumberProperty()
  public registeredTimeInDays: number;

  @ResponseDtoEnumProperty(DashboardUserTypeEnum)
  public userType: DashboardUserTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public organizationName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public paymentPlanName: string | null;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public paymentPlanPrice: DecimalValue | null;

  @ResponseDtoEnumProperty(DashboardSubscriptionStatusEnum)
  public subscriptionStatus: DashboardSubscriptionStatusEnum;

  protected override readonly _type = UserItemResponseDto.name;
}
