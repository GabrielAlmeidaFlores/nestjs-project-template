import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty({ required: false })
  public endDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodWorkTypeEnum)
  public workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public impact?: string;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public withoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public resolvingPendencies: string;

  @ResponseDtoStringProperty()
  public withTimeAccelerators: string;

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
  )
  public contributionTime: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
  )
  public gracePeriod: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel;

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoStringProperty({ required: false })
  public nit?: string;

  @ResponseDtoStringProperty({ required: false })
  public birthDate?: string;

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementDenialFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisClientDataModel,
  )
  public clientData: GeneralUrbanRetirementDenialFirstAnalysisClientDataModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel,
  )
  public timeSummary: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: GeneralUrbanRetirementDenialFirstAnalysisPeriodModel[];

  protected override readonly _type =
    GeneralUrbanRetirementDenialFirstAnalysisModel.name;
}
