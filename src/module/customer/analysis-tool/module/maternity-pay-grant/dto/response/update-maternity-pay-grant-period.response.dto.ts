import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateMaternityPayGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MaternityPayGrantId)
  public maternityPayGrantId: MaternityPayGrantId;

  protected override readonly _type =
    UpdateMaternityPayGrantPeriodResponseDto.name;
}
