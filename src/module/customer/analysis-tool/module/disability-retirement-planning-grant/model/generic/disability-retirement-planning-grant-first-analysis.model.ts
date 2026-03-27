import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
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
export class DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly contributionValue: DecimalValue;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly name: string;

  @ResponseDtoDateProperty()
  public readonly startDate: Date;

  @ResponseDtoDateProperty()
  public readonly endDate: Date;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum)
  public readonly category: DisabilityRetirementPlanningGrantCategoryEnum;

  @ResponseDtoNumberProperty()
  public readonly gracePeriod: number;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
    {
      required: false,
    },
  )
  public readonly statusPCD?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @ResponseDtoBooleanProperty()
  public readonly status: boolean;

  @ResponseDtoBooleanProperty()
  public readonly isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public readonly competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public readonly contributionAverage?: DecimalValue;

  @ResponseDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel,
    { isArray: true },
  )
  public readonly belowMinimumContributions: DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel[];

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
    { required: false },
  )
  public readonly reasonPendency?: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bondOrigin?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly documentName: string;

  @ResponseDtoStringProperty()
  public readonly viability: string;

  @ResponseDtoStringProperty()
  public readonly cid: string;

  @ResponseDtoStringProperty()
  public readonly degree: string;

  @ResponseDtoStringProperty()
  public readonly date: string;

  @ResponseDtoStringProperty()
  public readonly crm: string;

  @ResponseDtoStringProperty({ isArray: true })
  public readonly observations: string[];

  protected override readonly _type =
    DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly predominantDisabilityDegree: string;

  @ResponseDtoNumberProperty()
  public readonly lightDisabilityPercentage: number;

  @ResponseDtoNumberProperty()
  public readonly moderateDisabilityPercentage: number;

  @ResponseDtoNumberProperty()
  public readonly severeDisabilityPercentage: number;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel,
    { isArray: true },
  )
  public readonly documents: DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel[];

  protected override readonly _type =
    DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningGrantFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel,
    { isArray: true },
  )
  public readonly periods: DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel[];

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel,
  )
  public readonly disabilityAnalysis: DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantFirstAnalysisModel.name;
}
