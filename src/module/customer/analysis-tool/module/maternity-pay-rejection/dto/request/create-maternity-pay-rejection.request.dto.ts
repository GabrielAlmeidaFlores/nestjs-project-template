import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateMaternityPayRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(MaternityPayRejectionDocumentTypeEnum)
  public type: MaternityPayRejectionDocumentTypeEnum;

  protected override readonly _type =
    CreateMaternityPayRejectionDocumentRequestDto.name;
}

@RequestDto()
export class CreateMaternityPayRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(MaternityPayRejectionTriggeringEventEnum, {
    required: false,
  })
  public triggeringEvent?: MaternityPayRejectionTriggeringEventEnum;

  @RequestDtoDateProperty({ required: false })
  public triggeringEventDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public estimatedTriggeringEventDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public workAccidentOrSevereDesease?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public clientWasUnemployedOnBenefitOrDisabilityStartDate?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public clientWasRuralInsuredOnBenefitOrDisabilityStartDate?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public isCurrentlyUnemployed?: boolean;

  @RequestDtoEnumProperty(MaternityPayRejectionCategoryEnum, {
    required: false,
  })
  public category?: MaternityPayRejectionCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public thirdPartyDocumentRelationDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @RequestDtoObjectProperty(
    () => CreateMaternityPayRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateMaternityPayRejectionDocumentRequestDto[];

  protected override readonly _type =
    CreateMaternityPayRejectionRequestDto.name;
}
