import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataGeneralUrbanRetirementReviewRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoStringProperty({ required: false })
  public category?: string;

  @RequestDtoStringProperty({ required: false })
  public myInssPassword?: string;

  protected override readonly _type =
    DataGeneralUrbanRetirementReviewRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementReviewRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => DataGeneralUrbanRetirementReviewRequestDto)
  public json: DataGeneralUrbanRetirementReviewRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementReviewRequestDto.name;
}
