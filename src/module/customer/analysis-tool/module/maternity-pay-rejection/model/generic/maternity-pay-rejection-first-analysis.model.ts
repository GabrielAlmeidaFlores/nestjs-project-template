import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MaternityPayRejectionCarencyModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly isExempt: boolean;

  @ResponseDtoStringProperty()
  public readonly status: string;

  @ResponseDtoStringProperty()
  public readonly details: string;

  @ResponseDtoStringProperty()
  public readonly legalBasis: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly contributionCount?: string;

  protected override readonly _type = MaternityPayRejectionCarencyModel.name;
}

@ResponseDto()
export class MaternityPayRejectionGracePeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly withinTheGracePeriod: boolean;

  @ResponseDtoStringProperty()
  public readonly situation: string;

  @ResponseDtoStringProperty()
  public readonly applicableGracePeriod: string;

  @ResponseDtoStringProperty()
  public readonly endOfGracePeriod: string;

  protected override readonly _type =
    MaternityPayRejectionGracePeriodModel.name;
}

@ResponseDto()
export class MaternityPayRejectionBenefitInformationModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly situation: string;

  @ResponseDtoStringProperty()
  public readonly duration: string;

  @ResponseDtoStringProperty()
  public readonly startDate: string;

  @ResponseDtoStringProperty()
  public readonly concessionDate: string;

  @ResponseDtoStringProperty()
  public readonly startOfTheLeave: string;

  @ResponseDtoStringProperty()
  public readonly endOfTheLeave: string;

  @ResponseDtoStringProperty()
  public readonly totalLeaveDuration: string;

  @ResponseDtoStringProperty()
  public readonly amountBenefit: string;

  @ResponseDtoStringProperty()
  public readonly calculationBasis: string;

  protected override readonly _type =
    MaternityPayRejectionBenefitInformationModel.name;
}

@ResponseDto()
export class MaternityPayRejectionRequirementDeadlineModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly triggeringEventDate: string;

  @ResponseDtoStringProperty()
  public readonly requirementDate: string;

  @ResponseDtoStringProperty()
  public readonly statuoryDeadline: string;

  @ResponseDtoStringProperty()
  public readonly details: string;

  @ResponseDtoStringProperty()
  public readonly justification: string;

  protected override readonly _type =
    MaternityPayRejectionRequirementDeadlineModel.name;
}

@ResponseDto()
export class MaternityPayRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly insuredStatusManteined: boolean;

  @ResponseDtoStringProperty()
  public readonly insuredStatusAnalysisConclusion: string;

  @ResponseDtoObjectProperty(() => MaternityPayRejectionCarencyModel, {
    required: false,
  })
  public readonly carency?: MaternityPayRejectionCarencyModel;

  @ResponseDtoObjectProperty(() => MaternityPayRejectionGracePeriodModel)
  public readonly gracePeriod: MaternityPayRejectionGracePeriodModel;

  @ResponseDtoObjectProperty(() => MaternityPayRejectionBenefitInformationModel)
  public readonly benefitInformation: MaternityPayRejectionBenefitInformationModel;

  @ResponseDtoObjectProperty(
    () => MaternityPayRejectionRequirementDeadlineModel,
  )
  public readonly requirementDeadline: MaternityPayRejectionRequirementDeadlineModel;

  protected override readonly _type =
    MaternityPayRejectionFirstAnalysisModel.name;
}
