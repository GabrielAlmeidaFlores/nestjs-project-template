import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
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
    TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyType?: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitRejectionCategoryEnum;

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
    TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () =>
      TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel,
  )
  public clientData: TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel;

  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel[];

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
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel[];

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisModel.name;
}
