import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineCnisContributionPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public type?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false })
  public document?: Base64FileRequestDto;

  protected override readonly _type =
    UpdateRuralTimelineCnisContributionPeriodDocumentRequestDto.name;
}
