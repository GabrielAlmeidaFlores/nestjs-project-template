import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PerCapitaIncomeForBpcAnalysisId)
  public id: PerCapitaIncomeForBpcAnalysisId;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResponseDto.name;
}
