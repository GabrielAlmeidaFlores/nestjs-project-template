import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveTemporaryIncapacityBenefitRejectionPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public competence?: string;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitRejectionPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryIncapacityBenefitRejectionPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitRejectionCategoryEnum;

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
    TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoObjectProperty(
    () =>
      SaveTemporaryIncapacityBenefitRejectionPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: SaveTemporaryIncapacityBenefitRejectionPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitRejectionPeriodsItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SaveTemporaryIncapacityBenefitRejectionPeriodsItemRequestDto,
    { isArray: true },
  )
  public periods: SaveTemporaryIncapacityBenefitRejectionPeriodsItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto.name;
}
