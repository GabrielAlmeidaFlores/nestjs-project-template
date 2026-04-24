import { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateMaternityPayRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(MaternityPayRejectionDocumentTypeEnum)
  public type: MaternityPayRejectionDocumentTypeEnum;

  protected override readonly _type =
    UpdateMaternityPayRejectionDocumentRequestDto.name;
}

@RequestDto()
export class UpdateMaternityPayRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(MaternityPayRejectionTriggeringEventEnum, {
    required: false,
  })
  public triggeringEvent?: MaternityPayRejectionTriggeringEventEnum;

  @RequestDtoDateProperty({ required: false })
  public triggeringEventDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public isCurrentlyUnemployed?: boolean;

  @RequestDtoEnumProperty(MaternityPayRejectionCategoryEnum, {
    required: false,
  })
  public category?: MaternityPayRejectionCategoryEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @RequestDtoObjectProperty(
    () => UpdateMaternityPayRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateMaternityPayRejectionDocumentRequestDto[];

  protected override readonly _type =
    UpdateMaternityPayRejectionRequestDto.name;
}
