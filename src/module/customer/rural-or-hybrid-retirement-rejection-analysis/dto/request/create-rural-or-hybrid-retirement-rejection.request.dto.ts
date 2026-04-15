import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public analysisToolClientId: string;

  @RequestDtoStringProperty()
  public federativeEntity: string;

  @RequestDtoStringProperty({ required: false })
  public state?: string;

  @RequestDtoStringProperty({ required: false })
  public municipality?: string;

  @RequestDtoStringProperty()
  public analysisName: string;

  @RequestDtoStringProperty({ required: false })
  public currentPosition?: string;

  @RequestDtoStringProperty({ required: false })
  public activityType?: string;

  @RequestDtoDateProperty({ required: false })
  public publicServiceStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public careerStartDate?: Date;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionRequestDto.name;
}
