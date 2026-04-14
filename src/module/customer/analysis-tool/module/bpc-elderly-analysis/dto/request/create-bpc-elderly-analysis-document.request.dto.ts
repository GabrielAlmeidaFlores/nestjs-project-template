import { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcElderlyAnalysisDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcElderlyAnalysisDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcElderlyAnalysisDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcElderlyAnalysisDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateBpcElderlyAnalysisDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcElderlyAnalysisDocumentItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly documents: CreateBpcElderlyAnalysisDocumentItemRequestDto[];

  protected override readonly _type =
    CreateBpcElderlyAnalysisDocumentRequestDto.name;
}
