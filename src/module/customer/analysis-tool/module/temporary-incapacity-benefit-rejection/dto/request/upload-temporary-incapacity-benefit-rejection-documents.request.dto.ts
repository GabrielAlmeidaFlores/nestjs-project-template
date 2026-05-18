import { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TemporaryIncapacityBenefitRejectionDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitRejectionDocumentTypeEnum)
  public type: TemporaryIncapacityBenefitRejectionDocumentTypeEnum;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: TemporaryIncapacityBenefitRejectionDocumentItemRequestDto[];

  protected override readonly _type =
    UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto.name;
}
