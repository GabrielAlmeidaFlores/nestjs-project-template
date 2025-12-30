import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRgpsTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsTimeAcceleratorId)
  public id: RetirementPlanningRgpsTimeAcceleratorId;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoDateProperty({ required: false })
  public deletedAt?: Date | null;

  @ResponseDtoStringProperty()
  public timeType: string;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoDateProperty({ required: false })
  public periodStart?: Date;

  @ResponseDtoDateProperty({ required: false })
  public periodEnd?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public affectsQualifyingPeriod?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public timeGained?: string;

  @ResponseDtoStringProperty({ required: false })
  public viability?: string;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    GetRetirementPlanningRgpsTimeAcceleratorResponseDto.name;
}
