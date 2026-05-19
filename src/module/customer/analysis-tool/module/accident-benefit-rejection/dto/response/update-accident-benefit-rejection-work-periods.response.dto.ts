import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateAccidentBenefitRejectionWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentBenefitRejectionId)
  public accidentBenefitRejectionId: AccidentBenefitRejectionId;

  protected override readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodsResponseDto.name;
}
