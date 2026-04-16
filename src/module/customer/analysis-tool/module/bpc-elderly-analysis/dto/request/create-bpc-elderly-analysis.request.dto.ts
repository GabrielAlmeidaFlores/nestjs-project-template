import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcElderlyAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public readonly name?: string;

  @RequestDtoEnumProperty(BpcElderlyAnalysisCategoryEnum, {
    required: false,
  })
  public readonly category?: BpcElderlyAnalysisCategoryEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumbers?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumbers?: string[];

  protected override readonly _type = CreateBpcElderlyAnalysisRequestDto.name;
}
