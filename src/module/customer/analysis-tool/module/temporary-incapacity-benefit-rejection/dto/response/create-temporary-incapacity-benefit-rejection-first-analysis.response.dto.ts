import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/generic/temporary-incapacity-benefit-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitRejectionId)
  public temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisModel,
  )
  public firstAnalysis: TemporaryIncapacityBenefitRejectionFirstAnalysisModel;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto.name;
}
