import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisWorkSpecialPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({ required: false })
  public recognizedSpecialTime?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public companyName?: string;

  @ResponseDtoStringProperty({ required: false })
  public cnpj?: string;

  @ResponseDtoStringProperty({ required: false })
  public position?: string;

  @ResponseDtoStringProperty({ required: false })
  public comprobatoryDocument?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public linkedToCnis?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public containsCnisRemunerationInPeriod?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public technicalJustification?: string;

  @ResponseDtoStringProperty({ required: false })
  public additionalObservation?: string;

  @ResponseDtoStringProperty({ required: false })
  public lawyerObservation?: string;

  @ResponseDtoStringProperty({ required: false })
  public exposureFrequency?: string;

  @ResponseDtoStringProperty({ required: false })
  public informationSource?: string;

  @ResponseDtoStringProperty({ required: false })
  public identifiedAgents?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public efficientEpi?: boolean;

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisWorkSpecialPeriodModel.name;
}

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisEarningsHistoryModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoStringProperty({ required: false })
  public paymentDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisEarningsHistoryModel.name;
}

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisWorkPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public bondOrigin: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty()
  public endDate: string;

  @ResponseDtoStringProperty()
  public category: string;

  @ResponseDtoStringProperty({ isArray: true })
  public pendencyReason: string[];

  @ResponseDtoStringProperty()
  public periodConsideration: string;

  @ResponseDtoStringProperty()
  public contributionAverage: string;

  @ResponseDtoStringProperty()
  public status: string;

  @ResponseDtoStringProperty()
  public gracePeriod: string;

  @ResponseDtoStringProperty()
  public activityType: string;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionFirstAnalysisEarningsHistoryModel,
    { isArray: true, required: false },
  )
  public earningsHistory?: SpecialRetirementRejectionFirstAnalysisEarningsHistoryModel[];

  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionFirstAnalysisWorkSpecialPeriodModel,
    { isArray: true, required: false },
  )
  public specialPeriods?: SpecialRetirementRejectionFirstAnalysisWorkSpecialPeriodModel[];

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisWorkPeriodModel.name;
}

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public decisionAnalysis: string;

  @ResponseDtoStringProperty()
  public specialTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public commonTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public totalTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodWithAccelerators: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodWithAccelerators: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodWithAccelerators: string;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionFirstAnalysisWorkPeriodModel,
    { isArray: true },
  )
  public workPeriods: SpecialRetirementRejectionFirstAnalysisWorkPeriodModel[];

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisModel.name;
}
