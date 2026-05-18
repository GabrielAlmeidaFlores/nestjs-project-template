import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SpecialRetirementRejectionCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-category.enum';
import { SpecialRetirementRejectionHarmfulAgentEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-harmful-agent.enum';
import { SpecialRetirementRejectionRejectionReasonEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-rejection-reason.enum';
import { SpecialRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/enum/special-retirement-rejection-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSpecialRetirementRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(SpecialRetirementRejectionDocumentTypeEnum)
  public type: SpecialRetirementRejectionDocumentTypeEnum;

  protected override readonly _type =
    CreateSpecialRetirementRejectionDocumentRequestDto.name;
}

@RequestDto()
export class CreateSpecialRetirementRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(SpecialRetirementRejectionCategoryEnum, {
    required: false,
  })
  public category?: SpecialRetirementRejectionCategoryEnum;

  @RequestDtoDateProperty({ required: false })
  public requirementStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public rejectionDate?: Date;

  @RequestDtoEnumProperty(SpecialRetirementRejectionHarmfulAgentEnum, {
    required: false,
    isArray: true,
  })
  public harmfulAgents?: SpecialRetirementRejectionHarmfulAgentEnum[];

  @RequestDtoStringProperty({ required: false })
  public otherAgents?: string;

  @RequestDtoEnumProperty(SpecialRetirementRejectionRejectionReasonEnum, {
    required: false,
  })
  public rejectionReason?: SpecialRetirementRejectionRejectionReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public otherRejectionReason?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateSpecialRetirementRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateSpecialRetirementRejectionDocumentRequestDto[];

  protected override readonly _type =
    CreateSpecialRetirementRejectionRequestDto.name;
}
