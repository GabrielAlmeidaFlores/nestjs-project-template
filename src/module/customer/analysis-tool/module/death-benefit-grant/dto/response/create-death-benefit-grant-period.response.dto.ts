import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitGrantPeriodId)
  public deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId;

  protected override readonly _type =
    CreateDeathBenefitGrantPeriodResponseDto.name;
}
