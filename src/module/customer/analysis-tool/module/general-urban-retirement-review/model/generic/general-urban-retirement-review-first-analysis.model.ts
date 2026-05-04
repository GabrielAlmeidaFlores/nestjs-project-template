import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-category.enum';
import { GeneralUrbanRetirementReviewPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-consideration.enum';
import { GeneralUrbanRetirementReviewPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-pendency-reason.enum';
import { GeneralUrbanRetirementReviewPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-work-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementReviewPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyType?: GeneralUrbanRetirementReviewPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementReviewPeriodCategoryEnum, {
    required: false,
  })
  public category?: GeneralUrbanRetirementReviewPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty({ required: false })
  public endDate?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementReviewPeriodWorkTypeEnum)
  public workType: GeneralUrbanRetirementReviewPeriodWorkTypeEnum;

  @ResponseDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @ResponseDtoNumberProperty({ required: false })
  public graceMonths?: number;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementReviewPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: GeneralUrbanRetirementReviewPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementReviewPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: GeneralUrbanRetirementReviewPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public withoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public resolvingPendencies: string;

  @ResponseDtoStringProperty()
  public withTimeAccelerators: string;

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel,
  )
  public contributionTime: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel,
  )
  public gracePeriod: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioModel;

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoStringProperty({ required: false })
  public nit?: string;

  @ResponseDtoStringProperty({ required: false })
  public birthDate?: string;

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class GeneralUrbanRetirementReviewFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisClientDataModel,
  )
  public clientData: GeneralUrbanRetirementReviewFirstAnalysisClientDataModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryModel,
  )
  public timeSummary: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementReviewFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: GeneralUrbanRetirementReviewFirstAnalysisPeriodModel[];

  protected override readonly _type =
    GeneralUrbanRetirementReviewFirstAnalysisModel.name;
}
