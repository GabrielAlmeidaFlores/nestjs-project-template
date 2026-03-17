import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import { CreateSpecialCategoryRetirementAnalysisRemunerationInlineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration-inline.request.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodInlineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period-inline.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSpecialCategoryRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisCustomName?: string;

  @RequestDtoEnumProperty(RetirementAnalysisObjectiveTypeEnum, {
    required: false,
  })
  public retirementAnalysisObjectiveType?: RetirementAnalysisObjectiveTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public publicServiceFederativeEntityName?: string;

  @RequestDtoStringProperty({ required: false })
  public publicServiceStateAbbreviation?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasConfirmedExposureToHarmfulAgents?: boolean;

  @RequestDtoStringProperty({ required: false })
  public administrativeProcedureAnalysis?: string;

  @RequestDtoObjectProperty(
    () => CreateSpecialCategoryRetirementAnalysisWorkPeriodInlineRequestDto,
    { required: false, isArray: true },
  )
  public workPeriods?: CreateSpecialCategoryRetirementAnalysisWorkPeriodInlineRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateSpecialCategoryRetirementAnalysisRemunerationInlineRequestDto,
    { required: false, isArray: true },
  )
  public remunerations?: CreateSpecialCategoryRetirementAnalysisRemunerationInlineRequestDto[];

  protected override readonly _type =
    CreateSpecialCategoryRetirementAnalysisRequestDto.name;
}
