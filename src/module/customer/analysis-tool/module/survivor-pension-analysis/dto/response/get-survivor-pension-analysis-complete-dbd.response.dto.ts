import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { GetSurvivorPensionAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-document.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisCompleteDbdResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  )
  public survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisId)
  public survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @ResponseDtoStringProperty({ required: false })
  public dependentFullName?: string;

  @ResponseDtoStringProperty({ required: false })
  public dependencyClassificationLevel?: string;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public gender?: string;

  @ResponseDtoDateProperty({ required: false })
  public dateOfBirth?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public hasDisabilityOrInvalidity?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public unionCommencementDate?: Date;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisDocumentResponseDto,
    { isArray: true },
  )
  public documents: GetSurvivorPensionAnalysisDocumentResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisCompleteDbdResponseDto.name;
}
