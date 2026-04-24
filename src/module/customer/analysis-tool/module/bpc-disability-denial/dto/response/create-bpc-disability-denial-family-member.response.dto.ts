import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateBpcDisabilityDenialFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcDisabilityDenialId)
  public readonly bpcDisabilityDenialId: BpcDisabilityDenialId;

  protected override readonly _type =
    CreateBpcDisabilityDenialFamilyMemberResponseDto.name;
}
