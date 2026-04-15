import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodCategoryEnum)
  public category: GeneralUrbanRetirementDenialPeriodCategoryEnum;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    {
      required: false,
    },
  )
  public pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodConsiderationEnum,
    {
      required: false,
    },
  )
  public periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

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
