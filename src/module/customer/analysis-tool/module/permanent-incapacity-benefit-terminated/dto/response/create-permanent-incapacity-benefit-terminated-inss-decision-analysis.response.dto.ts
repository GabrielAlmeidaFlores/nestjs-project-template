import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PermanentIncapacityBenefitTerminatedId)
  public permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  @ResponseDtoStringProperty({
    description:
      'texto da análise do INSS sobre a decisão de cessação do benefício',
  })
  public inssDecisionAnalysis: string;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto.name;
}
