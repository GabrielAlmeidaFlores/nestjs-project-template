import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateBpcElderlyCessationFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcElderlyCessationId)
  public readonly bpcElderlyCessationId: BpcElderlyCessationId;

  protected override readonly _type =
    CreateBpcElderlyCessationFamilyMemberResponseDto.name;
}
