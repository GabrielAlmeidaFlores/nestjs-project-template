import { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TemporaryDisabilityBenefitsTerminatedDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum)
  public type: TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TemporaryDisabilityBenefitsTerminatedDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: TemporaryDisabilityBenefitsTerminatedDocumentItemRequestDto[];

  protected override readonly _type =
    UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto.name;
}
