import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisCustomerProfileIdentificationId,
  )
  public survivorPensionAnalysisCpiId: SurvivorPensionAnalysisCustomerProfileIdentificationId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisId)
  public survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @ResponseDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public clientJobTitle?: string;

  @ResponseDtoStringProperty({ required: false })
  public legalProceedingNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public inssBenefitNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisPurpose?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto.name;
}
