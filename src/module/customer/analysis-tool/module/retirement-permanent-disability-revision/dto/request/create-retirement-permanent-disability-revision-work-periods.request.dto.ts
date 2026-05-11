import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
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
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
    CreateRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public bondOrigin: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty()
  public category: string;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoNumberProperty()
  public gracePeriod: number;

  @RequestDtoObjectProperty(
    () =>
      CreateRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: CreateRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto.name;
}
