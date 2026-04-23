import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateDeathBenefitRejectionDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitRejectionId)
  public deathBenefitRejectionId: DeathBenefitRejectionId;

  protected override readonly _type =
    UpdateDeathBenefitRejectionDependentResponseDto.name;
}
