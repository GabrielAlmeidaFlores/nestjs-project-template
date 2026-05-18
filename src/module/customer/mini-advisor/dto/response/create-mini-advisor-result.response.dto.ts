import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMiniAdvisorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MiniAdvisorResultId)
  public miniAdvisorResultId: MiniAdvisorResultId;

  @ResponseDtoEnumProperty(MiniAdvisorAnalysisTypeEnum)
  public chosenAnalysis: MiniAdvisorAnalysisTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public benefitDescription?: string;

  @ResponseDtoStringProperty({ required: false })
  public attentionNote?: string;

  protected override readonly _type = CreateMiniAdvisorResultResponseDto.name;
}
