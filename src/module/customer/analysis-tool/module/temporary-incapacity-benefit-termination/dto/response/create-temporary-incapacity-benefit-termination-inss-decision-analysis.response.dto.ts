import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitTerminationId)
  public temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  @ResponseDtoStringProperty({
    description:
      'texto da análise do INSS sobre a decisão de cessação do benefício',
  })
  public inssDecisionAnalysis: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto.name;
}
