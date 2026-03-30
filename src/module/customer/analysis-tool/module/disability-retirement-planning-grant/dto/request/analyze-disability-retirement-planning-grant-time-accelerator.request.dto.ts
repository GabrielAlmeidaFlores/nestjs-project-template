import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataAnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;

  protected override readonly _type =
    DataAnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataAnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
  )
  public json: DataAnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto.name;
}
