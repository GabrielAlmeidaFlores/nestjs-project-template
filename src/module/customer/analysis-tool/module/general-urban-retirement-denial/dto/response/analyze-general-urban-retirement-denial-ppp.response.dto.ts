import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodCategoryEnum)
  public category: GeneralUrbanRetirementDenialPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodWorkTypeEnum)
  public workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;

  @ResponseDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @ResponseDtoNumberProperty({ required: false })
  public graceMonths?: number;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    {
      required: false,
    },
  )
  public pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodConsiderationEnum,
    {
      required: false,
    },
  )
  public periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeGeneralUrbanRetirementDenialPppResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto,
    { isArray: true },
  )
  public periods: AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto[];

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementDenialPppResponseDto.name;
}
