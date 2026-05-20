import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public povertyDeclarationGeneratorCompleteAnalysis: string;

  protected override readonly _type =
    UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto.name;
}
