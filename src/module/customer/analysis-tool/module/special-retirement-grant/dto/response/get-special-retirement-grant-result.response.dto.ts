import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { SpecialRetirementGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-grant/model/generic/special-retirement-grant-first-analysis.model';

@ResponseDto()
export class GetSpecialRetirementGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantCompleteAnalysis?: object;

  @ResponseDtoStringProperty({ required: false })
  public specialRetirementGrantCompleteAnalysisDownload?: string;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantSimplifiedAnalysis?: object;

  @ResponseDtoObjectProperty(() => SpecialRetirementGrantFirstAnalysisModel, {
    required: false,
  })
  public specialRetirementGrantFirstAnalysis?: SpecialRetirementGrantFirstAnalysisModel;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantResultResponseDto.name;
}
