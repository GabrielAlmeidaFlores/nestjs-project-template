import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisWorkPeriodsResponseModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-periods-response.model';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefitType: string;

  @ResponseDtoStringProperty()
  public dib: string;

  @ResponseDtoNumberProperty()
  public initialMonthlyIncome: number;

  @ResponseDtoNumberProperty()
  public updatedMonthlyIncome: number;

  @ResponseDtoStringProperty()
  public insuredName: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public withoutPendingIssues: string;

  @ResponseDtoStringProperty()
  public afterResolvingPendingIssues: string;

  @ResponseDtoStringProperty()
  public withCollaborators: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel,
  )
  public minimumRequired: RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public competence: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public amount: DecimalValue;

  @ResponseDtoStringProperty()
  public reasonNotConsidered: string;

  @ResponseDtoStringProperty()
  public action: string;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel.name;
}

@ResponseDto()
export class RetirementPermanentDisabilityRevisionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel,
  )
  public benefitAnalysis: RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel;

  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel,
  )
  public contributionTime: RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel;

  @ResponseDtoObjectProperty(
    () =>
      RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel,
    { isArray: true },
  )
  public concessionLetterBreakdown: RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel[];

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionFirstAnalysisModel.name;
}

@ResponseDto()
export class CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRevisionId)
  public retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  @ResponseDtoObjectProperty(
    () => RetirementPermanentDisabilityRevisionFirstAnalysisModel,
  )
  public firstAnalysis: RetirementPermanentDisabilityRevisionFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => CnisWorkPeriodsResponseModel)
  public cnisWorkPeriods: CnisWorkPeriodsResponseModel;

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto.name;
}
