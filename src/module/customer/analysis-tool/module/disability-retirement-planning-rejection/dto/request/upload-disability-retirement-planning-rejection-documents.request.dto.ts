import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DisabilityRetirementPlanningRejectionDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(DisabilityRetirementPlanningRejectionDocumentTypeEnum)
  public type: DisabilityRetirementPlanningRejectionDocumentTypeEnum;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: DisabilityRetirementPlanningRejectionDocumentItemRequestDto[];

  protected override readonly _type =
    UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto.name;
}
