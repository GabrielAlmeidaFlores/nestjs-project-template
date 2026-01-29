import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class AddRuralTimelineAnalysisCnisDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    description:
      'Arquivo do documento CNIS (Cadastro Nacional de Informações Sociais)',
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
  })
  public cnisDocument: FileModel;

  protected override readonly _type =
    AddRuralTimelineAnalysisCnisDocumentRequestDto.name;
}
