import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreatePermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public remuneration?: string;

  @RequestDtoStringProperty({ required: false })
  public indicators?: string;

  @RequestDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public contribution?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public bondOrigin: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum)
  public category: PermanentIncapacityBenefitTerminatedCategoryEnum;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

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

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoNumberProperty()
  public gracePeriod: number;

  @RequestDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: CreatePermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class CreatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto.name;
}
