import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateAccidentAssistanceTerminatedEventRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public accidentDate: Date;

  @RequestDtoStringProperty()
  public accidentDescription: string;

  @RequestDtoStringProperty({ isArray: true })
  public cids: string[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { isArray: true })
  public medicalDocuments: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public previousMedicalReports?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public administrativeProcessDocuments?: Base64FileRequestDto[];

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedEventRequestDto.name;
}
