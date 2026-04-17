import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataAnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum;

  protected override readonly _type =
    DataAnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      DataAnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
  )
  public json: DataAnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto.name;
}
