import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitPeriodId)
  public deathBenefitPeriodId: DeathBenefitPeriodId;

  protected override readonly _type = CreateDeathBenefitPeriodResponseDto.name;
}
