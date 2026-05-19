import { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PermanentIncapacityBenefitTerminatedDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(PermanentIncapacityBenefitTerminatedDocumentTypeEnum)
  public type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => PermanentIncapacityBenefitTerminatedDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: PermanentIncapacityBenefitTerminatedDocumentItemRequestDto[];

  protected override readonly _type =
    UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto.name;
}
