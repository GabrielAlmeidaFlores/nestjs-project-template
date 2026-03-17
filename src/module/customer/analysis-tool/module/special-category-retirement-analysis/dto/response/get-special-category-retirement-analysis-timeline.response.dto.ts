import { WorkPeriodItemTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/work-period-item-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialCategoryRetirementAnalysisTimelineItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoEnumProperty(WorkPeriodItemTypeEnum)
  public workPeriodItemType: WorkPeriodItemTypeEnum;

  @ResponseDtoStringProperty()
  public displayTitle: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public durationDescription: string;

  @ResponseDtoStringProperty({ required: false })
  public locationDescription?: string;

  @ResponseDtoBooleanProperty()
  public isActivePeriod: boolean;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisTimelineItemResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisTimelineResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialCategoryRetirementAnalysisTimelineItemResponseDto,
    { isArray: true },
  )
  public data: SpecialCategoryRetirementAnalysisTimelineItemResponseDto[];

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisTimelineResponseDto.name;
}
