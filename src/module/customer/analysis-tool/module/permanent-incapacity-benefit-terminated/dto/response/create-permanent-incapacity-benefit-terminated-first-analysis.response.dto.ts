import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/generic/permanent-incapacity-benefit-terminated-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PermanentIncapacityBenefitTerminatedId)
  public permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  @ResponseDtoObjectProperty(
    () => PermanentIncapacityBenefitTerminatedFirstAnalysisModel,
  )
  public firstAnalysis: PermanentIncapacityBenefitTerminatedFirstAnalysisModel;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto.name;
}
