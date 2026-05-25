import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
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
    TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyType?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

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
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () =>
      TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel,
  )
  public clientData: TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel;

  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () =>
      TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel[];

  @ResponseDtoStringProperty()
  public analysisConclusion: string;

  @ResponseDtoStringProperty()
  public manteinedInsuredQuality: string;

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
    () => TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel[];

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel.name;
}
