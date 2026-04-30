import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/generic/temporary-incapacity-benefit-termination-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitTerminationId)
  public temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitTerminationFirstAnalysisModel,
  )
  public firstAnalysis: TemporaryIncapacityBenefitTerminationFirstAnalysisModel;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto.name;
}
