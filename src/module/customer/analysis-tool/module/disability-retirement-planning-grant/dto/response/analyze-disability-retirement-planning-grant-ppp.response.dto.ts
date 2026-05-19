import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum)
  public category: DisabilityRetirementPlanningGrantCategoryEnum;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
    { required: false },
  )
  public disabilityStatus?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: DisabilityRetirementPlanningGrantPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningGrantPppResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto,
    { isArray: true },
  )
  public periods: AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto[];

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantPppResponseDto.name;
}
