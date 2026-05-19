import { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateAccidentAssistanceGrantDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentAssistanceGrantDocumentTypeEnum)
  public type: AccidentAssistanceGrantDocumentTypeEnum;

  protected override readonly _type =
    UpdateAccidentAssistanceGrantDocumentRequestDto.name;
}

@RequestDto()
export class UpdateAccidentAssistanceGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(AccidentAssistanceGrantCategoryEnum, {
    required: false,
  })
  public category?: AccidentAssistanceGrantCategoryEnum;

  @RequestDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public hadPreviousTemporaryDisabilityAssistance?: boolean;

  @RequestDtoStringProperty({ required: false })
  public sequelDescription?: string;

  @RequestDtoStringProperty({ required: false })
  public associatedCidId?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @RequestDtoObjectProperty(
    () => UpdateAccidentAssistanceGrantDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateAccidentAssistanceGrantDocumentRequestDto[];

  protected override readonly _type =
    UpdateAccidentAssistanceGrantRequestDto.name;
}
