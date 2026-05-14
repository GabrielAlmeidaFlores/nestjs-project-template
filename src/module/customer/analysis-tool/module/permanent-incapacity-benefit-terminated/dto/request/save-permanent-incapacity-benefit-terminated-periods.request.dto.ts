import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SavePermanentIncapacityBenefitTerminatedPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public competence?: string;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    SavePermanentIncapacityBenefitTerminatedPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class SavePermanentIncapacityBenefitTerminatedPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum, {
    required: false,
  })
  public category?: PermanentIncapacityBenefitTerminatedCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoStringProperty()
  public startDate: string;

  @RequestDtoStringProperty({ required: false })
  public endDate?: string;

  @RequestDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @RequestDtoNumberProperty({ required: false })
  public graceMonths?: number;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoObjectProperty(
    () =>
      SavePermanentIncapacityBenefitTerminatedPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: SavePermanentIncapacityBenefitTerminatedPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    SavePermanentIncapacityBenefitTerminatedPeriodsItemRequestDto.name;
}

@RequestDto()
export class SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SavePermanentIncapacityBenefitTerminatedPeriodsItemRequestDto,
    { isArray: true },
  )
  public periods: SavePermanentIncapacityBenefitTerminatedPeriodsItemRequestDto[];

  protected override readonly _type =
    SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto.name;
}
