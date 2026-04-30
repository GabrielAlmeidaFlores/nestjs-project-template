import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveTemporaryDisabilityBenefitsTerminatedPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public competence?: string;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryDisabilityBenefitsTerminatedPeriodsDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsDocumentItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryDisabilityBenefitsTerminatedPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

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
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public isManualPeriod?: boolean;

  @RequestDtoObjectProperty(
    () =>
      SaveTemporaryDisabilityBenefitsTerminatedPeriodsDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: SaveTemporaryDisabilityBenefitsTerminatedPeriodsDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      SaveTemporaryDisabilityBenefitsTerminatedPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: SaveTemporaryDisabilityBenefitsTerminatedPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsItemRequestDto.name;
}

@RequestDto()
export class SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SaveTemporaryDisabilityBenefitsTerminatedPeriodsItemRequestDto,
    { isArray: true },
  )
  public periods: SaveTemporaryDisabilityBenefitsTerminatedPeriodsItemRequestDto[];

  protected override readonly _type =
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto.name;
}
