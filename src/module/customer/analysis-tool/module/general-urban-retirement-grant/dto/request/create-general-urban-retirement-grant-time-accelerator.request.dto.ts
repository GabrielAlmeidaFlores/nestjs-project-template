import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataCreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantAnalysisResultId)
  public generalUrbanRetirementGrantAnalysisResultId: GeneralUrbanRetirementGrantAnalysisResultId;

  protected override readonly _type =
    DataCreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
  )
  public json: DataCreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto.name;
}
