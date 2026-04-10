import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitGrantDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitGrantDependentId)
  public deathBenefitGrantDependentId: DeathBenefitGrantDependentId;

  protected override readonly _type =
    CreateDeathBenefitGrantDependentResponseDto.name;
}
