import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    MedicalAndSocialReportObjectionGeneratorAnalysisId,
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId;

  protected override readonly _type =
    UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.name;
}
