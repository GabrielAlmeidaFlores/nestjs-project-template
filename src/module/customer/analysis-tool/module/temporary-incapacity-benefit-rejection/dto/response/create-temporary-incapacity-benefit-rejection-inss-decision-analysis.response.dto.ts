import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitRejectionId)
  public temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  @ResponseDtoStringProperty({
    description: 'texto da análise do INSS sobre a decisão de benefício negado',
  })
  public inssDecisionAnalysis: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto.name;
}
