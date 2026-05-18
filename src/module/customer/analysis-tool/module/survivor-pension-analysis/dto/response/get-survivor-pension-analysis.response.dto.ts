import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { GetSurvivorPensionAnalysisCompleteBoiResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-boi.response.dto';
import { GetSurvivorPensionAnalysisCompleteCpiResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-cpi.response.dto';
import { GetSurvivorPensionAnalysisCompleteDbdResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-dbd.response.dto';
import { GetSurvivorPensionAnalysisCompleteDwhResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-dwh.response.dto';
import { GetSurvivorPensionAnalysisCompleteResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-result.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisId)
  public survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisCompleteCpiResponseDto,
    { required: false },
  )
  public customerProfileIdentification?: GetSurvivorPensionAnalysisCompleteCpiResponseDto;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisCompleteBoiResponseDto,
    { required: false },
  )
  public benefitOriginatorIdentification?: GetSurvivorPensionAnalysisCompleteBoiResponseDto;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisCompleteDwhResponseDto,
    { required: false },
  )
  public deceasedWorkHistory?: GetSurvivorPensionAnalysisCompleteDwhResponseDto;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisCompleteDbdResponseDto,
    { isArray: true },
  )
  public deceasedBenefitDependents: GetSurvivorPensionAnalysisCompleteDbdResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisCompleteResultResponseDto,
    { required: false },
  )
  public result?: GetSurvivorPensionAnalysisCompleteResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResponseDto.name;
}
