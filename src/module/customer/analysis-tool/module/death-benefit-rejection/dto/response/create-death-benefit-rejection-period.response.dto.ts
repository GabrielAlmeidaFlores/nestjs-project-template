import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitRejectionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitRejectionPeriodId)
  public deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId;

  protected override readonly _type =
    CreateDeathBenefitRejectionPeriodResponseDto.name;
}
