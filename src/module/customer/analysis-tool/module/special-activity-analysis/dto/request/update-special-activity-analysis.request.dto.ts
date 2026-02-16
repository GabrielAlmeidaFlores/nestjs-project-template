import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialActivityDocumentDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(SpecialActivityDocumentTypeEnum, {
    required: true,
  })
  public type: SpecialActivityDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type = UpdateSpecialActivityDocumentDto.name;
}

@RequestDto()
export class UpdateSpecialActivityAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => UpdateSpecialActivityDocumentDto, {
    isArray: true,
    required: false,
  })
  public documents?: UpdateSpecialActivityDocumentDto[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  protected override readonly _type =
    UpdateSpecialActivityAnalysisRequestDto.name;
}
