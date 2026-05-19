import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateBpcDisabilityTerminationDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcDisabilityTerminationId)
  public readonly bpcDisabilityTerminationId: BpcDisabilityTerminationId;

  protected override readonly _type =
    CreateBpcDisabilityTerminationDocumentResponseDto.name;
}
