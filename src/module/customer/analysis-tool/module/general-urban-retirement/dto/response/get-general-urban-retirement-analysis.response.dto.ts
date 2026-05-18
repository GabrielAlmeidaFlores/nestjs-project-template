import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GetGeneralUrbanRetirementAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-document.response.dto';
import { GetGeneralUrbanRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-period.response.dto';
import { GetGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration.response.dto';
import { GeneralUrbanRetirementCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/model/general-urban-retirement-complete-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public generalUrbanRetirementCompleteAnalysis?: GeneralUrbanRetirementCompleteAnalysisInterface;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public generalUrbanRetirementSimplifiedAnalysis?: object;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementAnalysisId)
  public id: GeneralUrbanRetirementAnalysisId;

  @ResponseDtoDateProperty({ required: false })
  public careerStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public publicServiceStartDate?: Date;

  @ResponseDtoObjectProperty(() => GetAnalysisToolClientResponseDto)
  public analysisToolClient: GetAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisResultResponseDto,
    { required: false },
  )
  public generalUrbanRetirementAnalysisResult?: GetGeneralUrbanRetirementAnalysisResultResponseDto;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementAnalysisFederativeEntityEnum, {
    required: false,
  })
  public federativeEntity?: GeneralUrbanRetirementAnalysisFederativeEntityEnum;

  @ResponseDtoEnumProperty(StateCodeEnum, { required: false })
  public state?: StateCodeEnum;

  @ResponseDtoStringProperty({ required: false })
  public municipality?: string;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementAnalysisBenefitTypeEnum, {
    required: false,
  })
  public benefitType?: GeneralUrbanRetirementAnalysisBenefitTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public currentPosition?: string;

  @ResponseDtoStringProperty({ required: false })
  public generalUrbanRetirementBenefitAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public legalProceedingNumber?: string;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisRemunerationResponseDto,
    { required: false, isArray: true },
  )
  public remunerations?: GetGeneralUrbanRetirementAnalysisRemunerationResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodResponseDto,
    { required: false, isArray: true },
  )
  public periods?: GetGeneralUrbanRetirementAnalysisPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetGeneralUrbanRetirementAnalysisDocumentResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisResponseDto.name;
}
