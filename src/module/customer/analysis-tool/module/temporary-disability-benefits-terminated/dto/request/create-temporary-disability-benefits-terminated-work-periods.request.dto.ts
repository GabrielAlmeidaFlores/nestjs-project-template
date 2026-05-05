import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
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
export class CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
    CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public bondOrigin: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum)
  public category: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoNumberProperty()
  public gracePeriod: number;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto.name;
}
