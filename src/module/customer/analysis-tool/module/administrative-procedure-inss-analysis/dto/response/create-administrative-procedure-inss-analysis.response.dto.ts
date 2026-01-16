import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAdministrativeProcedureInssAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AdministrativeProcedureInssAnalysisId)
  public administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId;

  protected override readonly _type =
    CreateAdministrativeProcedureInssAnalysisResponseDto.name;
}
