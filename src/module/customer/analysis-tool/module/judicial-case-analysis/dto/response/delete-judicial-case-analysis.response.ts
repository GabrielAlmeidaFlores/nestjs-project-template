import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteJudicialCaseAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(JudicialCaseAnalysisId)
  public judicialCaseAnalysisId: JudicialCaseAnalysisId;

  protected override readonly _type =
    DeleteJudicialCaseAnalysisResponseDto.name;
}
