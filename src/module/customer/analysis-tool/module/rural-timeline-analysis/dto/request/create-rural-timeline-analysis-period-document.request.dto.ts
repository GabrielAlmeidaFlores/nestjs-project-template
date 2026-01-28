import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ required: false })
  public documentYear?: number;

  @RequestDtoStringProperty({ required: false })
  public documentHolderType?: string;

  @RequestDtoBooleanProperty({ required: false })
  public selfOwned?: boolean;

  @RequestDtoStringProperty({ required: false })
  public probatoryPurpose?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentTypeEnum)
  public type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodDocumentRequestDto.name;
}
