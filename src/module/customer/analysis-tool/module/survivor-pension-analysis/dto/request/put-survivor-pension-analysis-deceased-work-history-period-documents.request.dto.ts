import { SurvivorPensionAnalysisDocumentItemRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/survivor-pension-analysis-document-item.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SurvivorPensionAnalysisDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: SurvivorPensionAnalysisDocumentItemRequestDto[];

  protected override readonly _type =
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto.name;
}
