import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisOverdueContributionModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly id: string;

  @ResponseDtoDateProperty()
  public readonly overdueDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public readonly paymentDate?: Date;

  @ResponseDtoDateProperty()
  public readonly createdAt: Date;

  @ResponseDtoDateProperty()
  public readonly updatedAt: Date;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisOverdueContributionModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisUnderMinimumModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly id: string;

  @ResponseDtoDateProperty()
  public readonly contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly contributionAmount: DecimalValue;

  @ResponseDtoDateProperty()
  public readonly createdAt: Date;

  @ResponseDtoDateProperty()
  public readonly updatedAt: Date;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisUnderMinimumModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisPendingExitDateModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly id: string;

  @ResponseDtoDateProperty()
  public readonly pendingDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly pendingAmount: DecimalValue;

  @ResponseDtoDateProperty()
  public readonly createdAt: Date;

  @ResponseDtoDateProperty()
  public readonly updatedAt: Date;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisPendingExitDateModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisObservationModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly id: string;

  @ResponseDtoStringProperty()
  public readonly observation: string;

  @ResponseDtoDateProperty()
  public readonly createdAt: Date;

  @ResponseDtoDateProperty()
  public readonly updatedAt: Date;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisObservationModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisAgentModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly type: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly intensity?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly unit?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly habitual?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly permanence?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public readonly source?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly epiEficaz?: boolean;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisAgentModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public readonly competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public readonly remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public readonly paymentDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public readonly id?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly sequencial?: number;

  @ResponseDtoStringProperty({ required: false })
  public readonly employmentRelationshipSource?: string;

  @ResponseDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public readonly category?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly impact?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly gracePeriod?: number;

  @ResponseDtoBooleanProperty()
  public shouldConsiderPeriod: boolean;

  @ResponseDtoStringProperty({ required: false })
  public readonly status?: string;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public readonly averageContributionAmount?: DecimalValue;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisAgentModel,
    {
      isArray: true,
      required: false,
    },
  )
  public readonly agents?: SpecialRetirementGrantFirstAnalysisAgentModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public readonly earningsHistory?: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisOverdueContributionModel,
    { isArray: true, required: false },
  )
  public readonly overdueContributions?: SpecialRetirementGrantFirstAnalysisOverdueContributionModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisUnderMinimumModel,
    { isArray: true, required: false },
  )
  public readonly underMinimums?: SpecialRetirementGrantFirstAnalysisUnderMinimumModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisPendingExitDateModel,
    { isArray: true, required: false },
  )
  public readonly pendingExitDates?: SpecialRetirementGrantFirstAnalysisPendingExitDateModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisObservationModel,
    { isArray: true, required: false },
  )
  public readonly observations?: SpecialRetirementGrantFirstAnalysisObservationModel[];

  @ResponseDtoDateProperty({ required: false })
  public readonly createdAt?: Date;

  @ResponseDtoDateProperty({ required: false })
  public readonly updatedAt?: Date;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisTimeSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public readonly withoutResolvingPendencies?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly resolvingPendencies?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly withAccelerators?: string;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisTimeSummaryModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({ required: false })
  public readonly withoutResolvingPendencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public readonly resolvingPendencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public readonly withAccelerators?: number;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisSummaryModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisTimeSummaryModel,
    { required: false },
  )
  public readonly specialTime?: SpecialRetirementGrantFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisTimeSummaryModel,
    { required: false },
  )
  public readonly commonTime?: SpecialRetirementGrantFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisTimeSummaryModel,
    { required: false },
  )
  public readonly totalTime?: SpecialRetirementGrantFirstAnalysisTimeSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel,
    { required: false },
  )
  public readonly specialGracePeriod?: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel,
    { required: false },
  )
  public readonly commonGracePeriod?: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel,
    { required: false },
  )
  public readonly totalGracePeriod?: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryModel;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisSummaryModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly periodStartDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public readonly periodEndDate?: Date;

  @ResponseDtoBooleanProperty()
  public readonly recognized: boolean;

  @ResponseDtoStringProperty({ required: false })
  public readonly justification?: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public readonly legalFramework?: string[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisAgentModel,
    {
      isArray: true,
      required: false,
    },
  )
  public readonly agents?: SpecialRetirementGrantFirstAnalysisAgentModel[];

  @ResponseDtoBooleanProperty({ required: false })
  public readonly epiEficaz?: boolean;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public readonly observations?: string[];

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel,
    { isArray: true },
  )
  public readonly items: SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel[];

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @ResponseDtoStringProperty()
  public readonly kind: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly label?: string;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel,
    { isArray: true },
  )
  public readonly items: SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel[];

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel.name;
}

@ResponseDto()
export class SpecialRetirementGrantFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisSummaryModel,
  )
  public readonly summary: SpecialRetirementGrantFirstAnalysisSummaryModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisPeriodModel,
    {
      isArray: true,
    },
  )
  public readonly periods: SpecialRetirementGrantFirstAnalysisPeriodModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel,
  )
  public readonly technicalDiagnosis: SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel,
  )
  public readonly integratedTimeline: SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel;

  protected override readonly _type =
    SpecialRetirementGrantFirstAnalysisModel.name;
}
