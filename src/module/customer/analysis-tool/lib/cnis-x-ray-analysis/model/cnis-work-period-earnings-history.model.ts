import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CnisWorkPeriodEarningsHistoryModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoBooleanProperty()
  public paymentOnTime: boolean;

  @ResponseDtoBooleanProperty()
  public countsForCarencia: boolean;

  @ResponseDtoBooleanProperty()
  public validCompetence: boolean;

  @ResponseDtoBooleanProperty()
  public contributionOnTime: boolean;

  @ResponseDtoBooleanProperty()
  public countsForContributionTime: boolean;

  @ResponseDtoStringProperty()
  public analysis: string;

  protected override readonly _type = CnisWorkPeriodEarningsHistoryModel.name;
}
