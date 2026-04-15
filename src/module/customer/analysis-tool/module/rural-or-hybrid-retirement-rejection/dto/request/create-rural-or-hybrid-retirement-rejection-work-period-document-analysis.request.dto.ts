import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public documentType?: string;

  @RequestDtoStringProperty({ required: false })
  public ownName?: string;

  @RequestDtoNumberProperty({ required: false })
  public documentYear?: number;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto,
    { isArray: true },
  )
  public documentAnalyses: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisRequestDto.name;
}
