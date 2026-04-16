import { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataAnalyzeDeathBenefitGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DeathBenefitGrantTimeAcceleratorTypeEnum)
  public type: DeathBenefitGrantTimeAcceleratorTypeEnum;

  protected override readonly _type =
    DataAnalyzeDeathBenefitGrantTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class AnalyzeDeathBenefitGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataAnalyzeDeathBenefitGrantTimeAcceleratorRequestDto,
  )
  public json: DataAnalyzeDeathBenefitGrantTimeAcceleratorRequestDto;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AnalyzeDeathBenefitGrantTimeAcceleratorRequestDto.name;
}
