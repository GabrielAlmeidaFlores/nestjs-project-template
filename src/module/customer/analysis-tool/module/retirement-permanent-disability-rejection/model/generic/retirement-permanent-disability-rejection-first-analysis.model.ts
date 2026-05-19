import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel extends BaseBuildableDtoObject {
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
    RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  @ResponseDtoStringProperty({ required: false })
  public pendencyType?: string;

  @ResponseDtoStringProperty({ required: false })
  public collectedAt?: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
    { required: false },
  )
  public category?: RetirementPermanentDisabilityRejectionPeriodCategoryEnum;

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
    RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel,
  )
  public clientData: RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel;

  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel[];

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
    () => RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public periods: RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionFirstAnalysisModel.name;
}
