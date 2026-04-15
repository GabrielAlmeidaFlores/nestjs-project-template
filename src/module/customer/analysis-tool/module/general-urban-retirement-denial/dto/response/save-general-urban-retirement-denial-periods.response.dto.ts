import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';

@ResponseDto()
export class SaveGeneralUrbanRetirementDenialPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementDenialId)
  public generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  protected override readonly _type =
    SaveGeneralUrbanRetirementDenialPeriodsResponseDto.name;
}
