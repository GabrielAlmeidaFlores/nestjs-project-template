import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoStringProperty({ required: false })
  public birthDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public gender?: string;

  @ResponseDtoStringProperty({ required: false })
  public email?: string;

  @ResponseDtoStringProperty({ required: false })
  public phone?: string;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoStringProperty({ required: false })
  public nb?: string;

  @ResponseDtoStringProperty({ required: false })
  public judicialProcessNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public incapacityStartDate?: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyType?: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitTerminationCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitTerminationCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty({ required: false })
  public endDate?: string;

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
    TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () =>
      TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitTerminationFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel,
  )
  public clientData: TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel;

  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () =>
      TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel[];

  @ResponseDtoStringProperty()
  public analysisConclusion: string;

  @ResponseDtoBooleanProperty()
  public graceExtensionDueToInvoluntaryUnemployment: boolean;

  @ResponseDtoBooleanProperty()
  public requestToExtendGracePeriod: boolean;

  @ResponseDtoBooleanProperty()
  public graceExempt: boolean;

  @ResponseDtoStringProperty()
  public graceValidation: string;

  @ResponseDtoStringProperty()
  public contributionTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public contributionTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public contributionTimeWithAccelerators: string;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel[];

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationFirstAnalysisModel.name;
}
