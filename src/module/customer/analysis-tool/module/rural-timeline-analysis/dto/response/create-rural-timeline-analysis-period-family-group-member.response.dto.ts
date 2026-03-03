import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralTimelineAnalysisPeriodFamilyGroupMemberId,
  )
  public ruralTimelineAnalysisPeriodFamilyGroupMemberId: RuralTimelineAnalysisPeriodFamilyGroupMemberId;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.name;
}
