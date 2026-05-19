import { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataAnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum)
  public type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;

  protected override readonly _type =
    DataAnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataAnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
  )
  public json: DataAnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto.name;
}
