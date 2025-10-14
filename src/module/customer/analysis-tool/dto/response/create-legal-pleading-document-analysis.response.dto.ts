import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateLegalPleadingDocumentTypeAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(LegalPleadingDocumentTypeEnum)
  public readonly type: LegalPleadingDocumentTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly analysis?: string;

  protected override readonly _type =
    CreateLegalPleadingDocumentTypeAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateLegalPleadingDocumentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CreateLegalPleadingDocumentTypeAnalysisResponseDto,
    { isArray: true },
  )
  public readonly data: CreateLegalPleadingDocumentTypeAnalysisResponseDto[];

  protected override readonly _type =
    CreateLegalPleadingDocumentAnalysisResponseDto.name;
}
