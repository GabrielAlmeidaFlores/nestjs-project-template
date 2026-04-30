import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto,
    { isArray: true },
  )
  public documents: RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto[];

  @RequestDtoStringProperty({ required: false })
  public periodStartDate?: string;

  @RequestDtoStringProperty({ required: false })
  public periodEndDate?: string;

  @RequestDtoStringProperty({ required: false })
  public workerType?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyName?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyCity?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyState?: string;

  protected override readonly _type =
    AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto.name;
}
