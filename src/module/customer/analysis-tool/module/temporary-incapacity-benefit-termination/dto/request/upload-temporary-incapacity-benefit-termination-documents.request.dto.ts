import { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TemporaryIncapacityBenefitTerminationDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitTerminationDocumentTypeEnum)
  public type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TemporaryIncapacityBenefitTerminationDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: TemporaryIncapacityBenefitTerminationDocumentItemRequestDto[];

  protected override readonly _type =
    UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto.name;
}
