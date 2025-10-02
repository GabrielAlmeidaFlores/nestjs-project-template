import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateCnisFastAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CnisFastAnalysisId)
  public cnisFastAnalysisId: CnisFastAnalysisId;

  protected override readonly _type = CreateCnisFastAnalysisResponseDto.name;
}
