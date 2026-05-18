import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementReviewDetailsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewId)
  public id: GeneralUrbanRetirementReviewId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocumentNumber?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthdate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public gender?: string;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoStringProperty({ required: false })
  public contributionTimeWithoutPendency?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionTimeWithPendency?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionTimeWithAcceleration?: string;

  @ResponseDtoStringProperty({ required: false })
  public carencyTimeWithoutPendency?: string;

  @ResponseDtoStringProperty({ required: false })
  public carencyTimeWithPendency?: string;

  @ResponseDtoStringProperty({ required: false })
  public carencyTimeWithAcceleration?: string;

  @ResponseDtoStringProperty({ required: false })
  public result?: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewDetailsResponseDto.name;
}
