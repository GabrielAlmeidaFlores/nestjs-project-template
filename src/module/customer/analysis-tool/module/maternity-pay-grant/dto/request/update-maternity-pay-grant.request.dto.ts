import { MaternityPayGrantBenefitTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-benefit-triggering-event.enum';
import { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateMaternityPayGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(MaternityPayGrantCategoryEnum, { required: false })
  public category?: MaternityPayGrantCategoryEnum;

  @RequestDtoEnumProperty(MaternityPayGrantTriggeringEventEnum, {
    required: false,
  })
  public triggeringEvent?: MaternityPayGrantTriggeringEventEnum;

  @RequestDtoDateProperty({ required: false })
  public triggeringEventDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public isCurrentlyUnemployed?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public isUnemployedAtTriggeringEventDate?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public isRuralInsured?: boolean;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public ruralPeriodDocumentDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoEnumProperty(MaternityPayGrantBenefitTriggeringEventEnum, {
    required: false,
  })
  public benefitTriggeringEvent?: MaternityPayGrantBenefitTriggeringEventEnum;

  @RequestDtoDateProperty({ required: false })
  public benefitTriggeringEventDate?: Date;

  protected override readonly _type = UpdateMaternityPayGrantRequestDto.name;
}
