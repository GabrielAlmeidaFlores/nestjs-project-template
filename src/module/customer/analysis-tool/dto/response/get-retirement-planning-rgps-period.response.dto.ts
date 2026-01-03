import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRgpsPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsPeriodId)
  public id: RetirementPlanningRgpsPeriodId;

  @ResponseDtoStringProperty({ required: false })
  public periodName?: string;

  @ResponseDtoDateProperty({ required: false })
  public periodStart?: Date;

  @ResponseDtoDateProperty({ required: false })
  public periodEnd?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public contributionAverage?: number;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoStringProperty({ required: false })
  public reasonPendency?: string;

  protected override readonly _type =
    GetRetirementPlanningRgpsPeriodResponseDto.name;
}
