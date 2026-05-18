import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GeneralUrbanRetirementDenialPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class GeneralUrbanRetirementDenialPeriodDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentItemRequestDto.name;
}

@RequestDto()
export class GeneralUrbanRetirementDenialPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialPeriodCategoryEnum, {
    required: false,
  })
  public category?: GeneralUrbanRetirementDenialPeriodCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialPeriodWorkTypeEnum)
  public workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;

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
    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum;

  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public shouldConsiderLastRemunerationAsExitDate?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoObjectProperty(
    () => GeneralUrbanRetirementDenialPeriodDocumentItemRequestDto,
    { isArray: true, required: false },
  )
  public documents?: GeneralUrbanRetirementDenialPeriodDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () => GeneralUrbanRetirementDenialPeriodEarningsHistoryItemRequestDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GeneralUrbanRetirementDenialPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodItemRequestDto.name;
}

@RequestDto()
export class SaveGeneralUrbanRetirementDenialPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => GeneralUrbanRetirementDenialPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: GeneralUrbanRetirementDenialPeriodItemRequestDto[];

  protected override readonly _type =
    SaveGeneralUrbanRetirementDenialPeriodsRequestDto.name;
}
