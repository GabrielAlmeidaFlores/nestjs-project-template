import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateElderlyBpcRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ElderlyBpcRejectionId)
  public elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected override readonly _type = CreateElderlyBpcRejectionResponseDto.name;
}
