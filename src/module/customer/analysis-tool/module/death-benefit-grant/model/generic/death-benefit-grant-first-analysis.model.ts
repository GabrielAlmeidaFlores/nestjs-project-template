import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
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
export class DeathBenefitGrantFirstAnalysisAnalysisSectionModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly isConfirmed: boolean;

  @ResponseDtoStringProperty()
  public readonly description: string;

  protected override readonly _type =
    DeathBenefitGrantFirstAnalysisAnalysisSectionModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisDependentQualityItemModel extends BaseBuildableDtoObject {
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
    DeathBenefitGrantFirstAnalysisDependentQualityItemModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel extends BaseBuildableDtoObject {
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
    DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly contributionValue: DecimalValue;

  protected override readonly _type =
    DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisEarningsHistoryItemModel extends BaseBuildableDtoObject {
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
    DeathBenefitGrantFirstAnalysisEarningsHistoryItemModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly name: string;

  @ResponseDtoDateProperty()
  public readonly startDate: Date;

  @ResponseDtoDateProperty()
  public readonly endDate: Date;

  @ResponseDtoEnumProperty(DeathBenefitGrantCategoryEnum)
  public readonly category: DeathBenefitGrantCategoryEnum;

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
    () => DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel,
    { isArray: true },
  )
  public readonly belowMinimumContributions: DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel[];

  @ResponseDtoEnumProperty(DeathBenefitGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public readonly reasonPendency?: DeathBenefitGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bondOrigin?: string;

  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisEarningsHistoryItemModel,
    { isArray: true, required: false },
  )
  public readonly earningsHistory?: DeathBenefitGrantFirstAnalysisEarningsHistoryItemModel[];

  protected override readonly _type =
    DeathBenefitGrantFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class DeathBenefitGrantFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly insuredQualityAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly scheduledRetirementRightAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly disabilityRetirementRightAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisDependentQualityItemModel,
    { isArray: true },
  )
  public readonly dependentQualityAnalysis: DeathBenefitGrantFirstAnalysisDependentQualityItemModel[];

  @ResponseDtoObjectProperty(
    () => DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel,
    { isArray: true },
  )
  public readonly retirementRuleSummaries: DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel[];

  @ResponseDtoObjectProperty(() => DeathBenefitGrantFirstAnalysisPeriodModel, {
    isArray: true,
  })
  public readonly periods: DeathBenefitGrantFirstAnalysisPeriodModel[];

  protected override readonly _type = DeathBenefitGrantFirstAnalysisModel.name;
}
