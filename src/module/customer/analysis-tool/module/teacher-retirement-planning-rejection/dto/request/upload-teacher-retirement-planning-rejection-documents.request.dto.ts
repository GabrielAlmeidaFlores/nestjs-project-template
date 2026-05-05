import { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TeacherRetirementPlanningRejectionDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRejectionDocumentTypeEnum)
  public type: TeacherRetirementPlanningRejectionDocumentTypeEnum;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadTeacherRetirementPlanningRejectionDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: TeacherRetirementPlanningRejectionDocumentItemRequestDto[];

  protected override readonly _type =
    UploadTeacherRetirementPlanningRejectionDocumentsRequestDto.name;
}
