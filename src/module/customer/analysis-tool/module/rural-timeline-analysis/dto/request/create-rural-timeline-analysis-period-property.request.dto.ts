import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisPeriodPropertyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public propertyName?: string;

  @RequestDtoStringProperty({ required: false })
  public ownerName?: string;

  @RequestDtoStringProperty({ required: false })
  public postalCode?: PostalCode;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public stateCode?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public city?: string;

  @RequestDtoStringProperty({ required: false })
  public neighborhood?: string;

  @RequestDtoStringProperty({ required: false })
  public street?: string;

  @RequestDtoStringProperty({ required: false })
  public streetNumber?: string;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodLandOwnershipTypeEnum, {
    required: false,
  })
  public landOwnershipType?: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodPropertyRequestDto.name;
}
