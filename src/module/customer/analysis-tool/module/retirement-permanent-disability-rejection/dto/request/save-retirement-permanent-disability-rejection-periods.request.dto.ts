import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import { RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-work-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class RetirementPermanentDisabilityRejectionPeriodDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentItemRequestDto.name;
}

@RequestDto()
export class RetirementPermanentDisabilityRejectionPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
    { required: false },
  )
  public category?: RetirementPermanentDisabilityRejectionPeriodCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum,
  )
  public workType: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoStringProperty({ required: false })
  public local?: string;

  @RequestDtoObjectProperty(
    () => RetirementPermanentDisabilityRejectionPeriodDocumentItemRequestDto,
    { isArray: true, required: false },
  )
  public documents?: RetirementPermanentDisabilityRejectionPeriodDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryItemRequestDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodItemRequestDto.name;
}

@RequestDto()
export class SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RetirementPermanentDisabilityRejectionPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: RetirementPermanentDisabilityRejectionPeriodItemRequestDto[];

  protected override readonly _type =
    SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto.name;
}
