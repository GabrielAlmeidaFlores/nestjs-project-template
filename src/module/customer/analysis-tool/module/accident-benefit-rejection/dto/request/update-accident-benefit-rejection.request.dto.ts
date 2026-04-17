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
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateAccidentBenefitRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentBenefitRejectionDocumentTypeEnum)
  public type: AccidentBenefitRejectionDocumentTypeEnum;

  protected override readonly _type =
    UpdateAccidentBenefitRejectionDocumentRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionEventDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentBenefitRejectionEventDocumentTypeEnum)
  public type: AccidentBenefitRejectionEventDocumentTypeEnum;

  protected override readonly _type =
    UpdateAccidentBenefitRejectionEventDocumentRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionEventRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public accidentDescription?: string;

  @RequestDtoStringProperty({ required: false })
  public cidTenId?: string;

  @RequestDtoObjectProperty(
    () => UpdateAccidentBenefitRejectionEventDocumentRequestDto,
    { required: false, isArray: true },
  )
  public eventDocuments?: UpdateAccidentBenefitRejectionEventDocumentRequestDto[];

  protected override readonly _type =
    UpdateAccidentBenefitRejectionEventRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionRequestDto extends BaseBuildableDtoObject {
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
    () => UpdateAccidentBenefitRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateAccidentBenefitRejectionDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => UpdateAccidentBenefitRejectionEventRequestDto,
    { required: false, isArray: true },
  )
  public events?: UpdateAccidentBenefitRejectionEventRequestDto[];

  protected override readonly _type =
    UpdateAccidentBenefitRejectionRequestDto.name;
}
