import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeGeneralUrbanRetirementReviewPppResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewSpecialPeriodId)
  public generalUrbanRetirementReviewSpecialPeriodId: GeneralUrbanRetirementReviewSpecialPeriodId;

  @ResponseDtoStringProperty({ required: false })
  public analysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public periodoOriginal?: string;

  @ResponseDtoStringProperty({ required: false })
  public periodoConvencional?: string;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementReviewPppResponseDto.name;
}
