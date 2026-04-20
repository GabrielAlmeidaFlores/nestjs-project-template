import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyType?: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
    {
      required: false,
    },
  )
  public category?: DisabilityRetirementPlanningRejectionPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty({ required: false })
  public endDate?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum,
  )
  public workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;

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
    DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
    { required: false },
  )
  public statusPCD?: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public local?: string;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public withoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public resolvingPendencies: string;

  @ResponseDtoStringProperty()
  public withTimeAccelerators: string;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public pcdTime: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public commonTime: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public totalTime: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public pcdGracePeriod: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public commonGracePeriod: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
  )
  public totalGracePeriod: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoStringProperty({ required: false })
  public nit?: string;

  @ResponseDtoStringProperty({ required: false })
  public birthDate?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public documentName: string;

  @ResponseDtoStringProperty()
  public viability: string;

  @ResponseDtoStringProperty()
  public cid: string;

  @ResponseDtoStringProperty()
  public degree: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public crm: string;

  @ResponseDtoStringProperty({ isArray: true })
  public observations: string[];

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public predominantDisabilityDegree: string;

  @ResponseDtoNumberProperty()
  public lightDisabilityPercentage: number;

  @ResponseDtoNumberProperty()
  public moderateDisabilityPercentage: number;

  @ResponseDtoNumberProperty()
  public severeDisabilityPercentage: number;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel,
    { isArray: true },
  )
  public documents: DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel[];

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel,
  )
  public clientData: DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel,
  )
  public timeSummary: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel[];

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel,
  )
  public disabilityAnalysis: DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionFirstAnalysisModel.name;
}
