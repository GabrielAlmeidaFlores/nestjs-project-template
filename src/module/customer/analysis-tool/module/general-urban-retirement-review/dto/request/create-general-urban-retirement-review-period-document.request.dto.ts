import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FileDocumentGeneralUrbanRetirementReviewPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentGeneralUrbanRetirementReviewPeriodDocumentRequestDto.name;
}

@RequestDto()
export class DataCreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementReviewPeriodId)
  public generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId;

  protected override readonly _type =
    DataCreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto,
  )
  public json: DataCreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentGeneralUrbanRetirementReviewPeriodDocumentRequestDto,
    { required: true, isArray: true },
  )
  public documents: FileDocumentGeneralUrbanRetirementReviewPeriodDocumentRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto.name;
}
