import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/generic/temporary-disability-benefits-terminated-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsTerminatedId)
  public temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel,
  )
  public firstAnalysis: TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto.name;
}
