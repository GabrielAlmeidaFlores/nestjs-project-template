import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
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
    PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  // Competency-level pendencies may include values such as NO_EXIT_DATE,
  // which are not part of the period-level pendency enum.
  @ResponseDtoStringProperty({ required: false })
  public pendencyType?: string;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum, {
    required: false,
  })
  public category?: PermanentIncapacityBenefitTerminatedCategoryEnum;

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
    PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () =>
      PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class PermanentIncapacityBenefitTerminatedFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel,
  )
  public clientData: PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel;

  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () =>
      PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel[];

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
    () => PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel[];

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedFirstAnalysisModel.name;
}
