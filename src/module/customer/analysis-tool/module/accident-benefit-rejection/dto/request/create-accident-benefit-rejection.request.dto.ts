import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';
import { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';
import { AccidentBenefitRejectionEventDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/enum/accident-benefit-rejection-event-document-type.enum';
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
export class CreateAccidentBenefitRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentBenefitRejectionDocumentTypeEnum)
  public type: AccidentBenefitRejectionDocumentTypeEnum;

  protected override readonly _type =
    CreateAccidentBenefitRejectionDocumentRequestDto.name;
}

@RequestDto()
export class CreateAccidentBenefitRejectionEventDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentBenefitRejectionEventDocumentTypeEnum)
  public type: AccidentBenefitRejectionEventDocumentTypeEnum;

  protected override readonly _type =
    CreateAccidentBenefitRejectionEventDocumentRequestDto.name;
}

@RequestDto()
export class CreateAccidentBenefitRejectionEventRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public accidentDescription?: string;

  @RequestDtoValueObjectProperty(CidTenId, { required: false })
  public cidTenId?: CidTenId;

  @RequestDtoObjectProperty(
    () => CreateAccidentBenefitRejectionEventDocumentRequestDto,
    { required: false, isArray: true },
  )
  public eventDocuments?: CreateAccidentBenefitRejectionEventDocumentRequestDto[];

  protected override readonly _type =
    CreateAccidentBenefitRejectionEventRequestDto.name;
}

@RequestDto()
export class CreateAccidentBenefitRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public requirementStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public rejectionDate?: Date;

  @RequestDtoEnumProperty(AccidentBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: AccidentBenefitRejectionCategoryEnum;

  @RequestDtoEnumProperty(AccidentBenefitRejectionMainReasonEnum, {
    required: false,
  })
  public mainAccidentBenefitRejectionReason?: AccidentBenefitRejectionMainReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public otherAccidentBenefitRejectionReason?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasPreviousGrantRelated?: boolean;

  @RequestDtoStringProperty({ required: false })
  public previousGrantBenefitNumber?: string;

  @RequestDtoDateProperty({ required: false })
  public previousGrantStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public previousGrantTerminationDate?: Date;

  @RequestDtoEnumProperty(AccidentBenefitRejectionRequestToExtendEnum, {
    required: false,
  })
  public requestToExtendTemporaryDisabilityBenefit?: AccidentBenefitRejectionRequestToExtendEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @RequestDtoObjectProperty(
    () => CreateAccidentBenefitRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateAccidentBenefitRejectionDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateAccidentBenefitRejectionEventRequestDto,
    { required: false, isArray: true },
  )
  public events?: CreateAccidentBenefitRejectionEventRequestDto[];

  protected override readonly _type =
    CreateAccidentBenefitRejectionRequestDto.name;
}
