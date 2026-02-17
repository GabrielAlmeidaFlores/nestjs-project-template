import { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public documentId: string;

  @ResponseDtoNumberProperty({ required: false })
  public documentYear?: number;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentHolderTypeEnum, {
    required: false,
  })
  public documentHolderType?: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public selfOwned?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public probatoryPurpose?: string;

  protected override readonly _type =
    AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto,
    { isArray: true },
  )
  public analyzedDocuments: AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto[];

  @ResponseDtoNumberProperty()
  public totalAnalyzed: number;

  protected override readonly _type =
    AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto.name;
}
