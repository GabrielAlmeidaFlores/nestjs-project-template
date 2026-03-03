import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDisabilityAssessmentForBpcAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityAssessmentForBpcAnalysisId)
  public disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId;

  protected override readonly _type =
    CreateDisabilityAssessmentForBpcAnalysisResponseDto.name;
}
