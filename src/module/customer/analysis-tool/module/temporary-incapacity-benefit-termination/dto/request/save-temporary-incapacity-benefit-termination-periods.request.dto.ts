import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveTemporaryIncapacityBenefitTerminationPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public competence?: string;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitTerminationPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryIncapacityBenefitTerminationPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitTerminationCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitTerminationCategoryEnum;

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
    TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoObjectProperty(
    () =>
      SaveTemporaryIncapacityBenefitTerminationPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: SaveTemporaryIncapacityBenefitTerminationPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitTerminationPeriodsItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SaveTemporaryIncapacityBenefitTerminationPeriodsItemRequestDto,
    { isArray: true },
  )
  public periods: SaveTemporaryIncapacityBenefitTerminationPeriodsItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto.name;
}
