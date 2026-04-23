import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(RuralOrHybridRetirementRejectionDocumentTypeEnum)
  public type: RuralOrHybridRetirementRejectionDocumentTypeEnum;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionDocumentRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionRequestedBenefitEnum,
    { required: false },
  )
  public requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum;

  @RequestDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public dateOfRejection?: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateRuralOrHybridRetirementRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateRuralOrHybridRetirementRejectionDocumentRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionRequestDto.name;
}
