import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateBpcElderlyAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcElderlyAnalysisId)
  public readonly bpcElderlyAnalysisId: BpcElderlyAnalysisId;

  protected override readonly _type = CreateBpcElderlyAnalysisResponseDto.name;
}
