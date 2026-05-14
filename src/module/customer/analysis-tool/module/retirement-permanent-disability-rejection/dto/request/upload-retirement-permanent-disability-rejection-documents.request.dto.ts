import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RetirementPermanentDisabilityRejectionDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionDocumentTypeEnum,
  )
  public type: RetirementPermanentDisabilityRejectionDocumentTypeEnum;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RetirementPermanentDisabilityRejectionDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: RetirementPermanentDisabilityRejectionDocumentItemRequestDto[];

  protected override readonly _type =
    UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto.name;
}
