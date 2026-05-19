import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRetirementPermanentDisabilityRevisionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(RetirementPermanentDisabilityRevisionCategoryEnum, {
    required: false,
  })
  public category?: RetirementPermanentDisabilityRevisionCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public myInssPassword?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionRequestDto.name;
}
