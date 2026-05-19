import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public povertyDeclarationGeneratorCompleteAnalysis: string;

  protected override readonly _type = UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto.name;
}
