import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisCustomerProfileIdentificationId,
  )
  public survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId;

  protected override readonly _type =
    PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto.name;
}
