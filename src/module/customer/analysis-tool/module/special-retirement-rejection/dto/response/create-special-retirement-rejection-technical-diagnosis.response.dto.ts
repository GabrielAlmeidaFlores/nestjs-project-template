import { SpecialRetirementRejectionTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/value-object/special-retirement-rejection-technical-diagnosis-id/special-retirement-rejection-technical-diagnosis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialRetirementRejectionTechnicalDiagnosisId,
  )
  public specialRetirementRejectionTechnicalDiagnosisId: SpecialRetirementRejectionTechnicalDiagnosisId;

  protected override readonly _type =
    CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto.name;
}
