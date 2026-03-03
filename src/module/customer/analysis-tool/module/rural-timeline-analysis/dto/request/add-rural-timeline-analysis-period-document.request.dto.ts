import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class AddRuralTimelineAnalysisPeriodDocumentJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentTypeEnum)
  public type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    AddRuralTimelineAnalysisPeriodDocumentJsonRequestDto.name;
}

@RequestDto()
export class AddRuralTimelineAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [
      MimeTypeEnum.APPLICATION_PDF,
      MimeTypeEnum.IMAGE_JPEG,
      MimeTypeEnum.IMAGE_PNG,
    ],
    required: true,
  })
  public file: FileModel;

  @RequestDtoObjectProperty(
    () => AddRuralTimelineAnalysisPeriodDocumentJsonRequestDto,
  )
  public json: AddRuralTimelineAnalysisPeriodDocumentJsonRequestDto;

  protected override readonly _type =
    AddRuralTimelineAnalysisPeriodDocumentRequestDto.name;
}
