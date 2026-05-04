import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class DataCompareGeneralUrbanRetirementReviewCnisCtpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementReviewId)
  public generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId;

  protected override readonly _type =
    DataCompareGeneralUrbanRetirementReviewCnisCtpsRequestDto.name;
}

@RequestDto()
export class CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    isArray: true,
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
  })
  public files: FileModel[];

  @RequestDtoObjectProperty(
    () => DataCompareGeneralUrbanRetirementReviewCnisCtpsRequestDto,
  )
  public json: DataCompareGeneralUrbanRetirementReviewCnisCtpsRequestDto;

  protected override readonly _type =
    CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto.name;
}
