import { CnisWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/enum/cnis-work-period-category.enum';
import { CnisWorkPeriodEarningsHistoryModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-period-earnings-history.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CnisWorkPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(CnisWorkPeriodCategoryEnum)
  public category: CnisWorkPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoStringProperty()
  public typeOfContribution: string;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoNumberProperty()
  public contributionAverage: number;

  @ResponseDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(() => CnisWorkPeriodEarningsHistoryModel, {
    isArray: true,
  })
  public earningsHistory: CnisWorkPeriodEarningsHistoryModel[];

  protected override readonly _type = CnisWorkPeriodModel.name;
}
