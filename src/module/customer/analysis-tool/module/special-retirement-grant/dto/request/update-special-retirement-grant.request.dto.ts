import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialRetirementGrantDocumentDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(SpecialRetirementGrantDocumentTypeEnum, {
    required: true,
  })
  public type: SpecialRetirementGrantDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    UpdateSpecialRetirementGrantDocumentDto.name;
}
@RequestDto()
export class UpdateSpecialRetirementGrantJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoBooleanProperty({ required: false })
  public specialActivity?: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false })
  public cnisDocument?: Base64FileRequestDto;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(() => UpdateSpecialRetirementGrantDocumentDto, {
    isArray: true,
    required: false,
  })
  public documents?: UpdateSpecialRetirementGrantDocumentDto[];

  protected override readonly _type =
    UpdateSpecialRetirementGrantJsonRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => UpdateSpecialRetirementGrantJsonRequestDto)
  public json: UpdateSpecialRetirementGrantJsonRequestDto;

  protected override readonly _type =
    UpdateSpecialRetirementGrantRequestDto.name;
}
