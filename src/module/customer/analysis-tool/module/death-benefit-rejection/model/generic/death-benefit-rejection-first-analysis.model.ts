import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisAnalysisSectionModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly isConfirmed: boolean;

  @ResponseDtoStringProperty()
  public readonly description: string;

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisAnalysisSectionModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisDependentQualityItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly dependentName: string;

  @ResponseDtoStringProperty()
  public readonly dependencyDegree: string;

  @ResponseDtoBooleanProperty()
  public readonly isQualityConfirmed: boolean;

  @ResponseDtoDateProperty()
  public readonly pensionStartDate: Date;

  @ResponseDtoStringProperty()
  public readonly estimatedPensionDuration: string;

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisDependentQualityItemModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly retirementRule: string;

  @ResponseDtoStringProperty()
  public readonly result: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly rightDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly estimatedRmi?: string;

  @ResponseDtoBooleanProperty()
  public readonly isBestRmi: boolean;

  @ResponseDtoBooleanProperty()
  public readonly isHighestCauseValue: boolean;

  @ResponseDtoStringProperty()
  public readonly detailedAnalysisDescription: string;

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly contributionValue: DecimalValue;

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public readonly competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public readonly remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public readonly paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public readonly contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly contributionSalary?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly analysis?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly name: string;

  @ResponseDtoDateProperty()
  public readonly startDate: Date;

  @ResponseDtoDateProperty()
  public readonly endDate: Date;

  @ResponseDtoEnumProperty(DeathBenefitRejectionCategoryEnum)
  public readonly category: DeathBenefitRejectionCategoryEnum;

  @ResponseDtoNumberProperty()
  public readonly gracePeriod: number;

  @ResponseDtoBooleanProperty()
  public readonly status: boolean;

  @ResponseDtoBooleanProperty()
  public readonly isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public readonly competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public readonly contributionAverage?: DecimalValue;

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel,
    { isArray: true },
  )
  public readonly belowMinimumContributions: DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel[];

  @ResponseDtoEnumProperty(DeathBenefitRejectionPeriodPendencyReasonEnum, {
    required: false,
  })
  public readonly reasonPendency?: DeathBenefitRejectionPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bondOrigin?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly impact?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly complementViaMyInss?: boolean;

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public readonly earningsHistory?: DeathBenefitRejectionFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class DeathBenefitRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisAnalysisSectionModel,
  )
  public readonly insuredQualityAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisAnalysisSectionModel,
  )
  public readonly scheduledRetirementRightAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisAnalysisSectionModel,
  )
  public readonly disabilityRetirementRightAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisDependentQualityItemModel,
    { isArray: true },
  )
  public readonly dependentQualityAnalysis: DeathBenefitRejectionFirstAnalysisDependentQualityItemModel[];

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel,
    { isArray: true },
  )
  public readonly retirementRuleSummaries: DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel[];

  @ResponseDtoObjectProperty(
    () => DeathBenefitRejectionFirstAnalysisPeriodModel,
    {
      isArray: true,
    },
  )
  public readonly periods: DeathBenefitRejectionFirstAnalysisPeriodModel[];

  protected override readonly _type =
    DeathBenefitRejectionFirstAnalysisModel.name;
}
