import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitDependentId)
  public deathBenefitDependentId: DeathBenefitDependentId;

  protected override readonly _type =
    CreateDeathBenefitDependentResponseDto.name;
}
