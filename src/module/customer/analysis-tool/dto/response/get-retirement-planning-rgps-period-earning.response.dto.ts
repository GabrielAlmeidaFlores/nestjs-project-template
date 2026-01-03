import { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRgpsPeriodEarningResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsEarningsHistoryId)
  public id: RetirementPlanningRgpsEarningsHistoryId;

  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetRetirementPlanningRgpsPeriodEarningResponseDto.name;
}
