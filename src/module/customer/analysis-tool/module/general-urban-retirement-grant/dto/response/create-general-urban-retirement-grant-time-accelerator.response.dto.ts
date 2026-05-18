import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementGrantTimeAcceleratorId)
  public generalUrbanRetirementGrantTimeAcceleratorId: GeneralUrbanRetirementGrantTimeAcceleratorId;

  protected override readonly _type =
    CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.name;
}
