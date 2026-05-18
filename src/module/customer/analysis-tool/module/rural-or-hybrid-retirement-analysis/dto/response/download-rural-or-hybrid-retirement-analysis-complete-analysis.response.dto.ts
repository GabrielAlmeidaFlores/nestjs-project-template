import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, { description: 'Arquivo em Base64' })
  public file: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisResponseDto.name;
}
