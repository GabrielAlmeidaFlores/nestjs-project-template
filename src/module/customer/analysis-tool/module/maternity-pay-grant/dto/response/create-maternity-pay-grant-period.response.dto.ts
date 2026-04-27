import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMaternityPayGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MaternityPayGrantPeriodId)
  public maternityPayGrantPeriodId: MaternityPayGrantPeriodId;

  protected override readonly _type =
    CreateMaternityPayGrantPeriodResponseDto.name;
}
