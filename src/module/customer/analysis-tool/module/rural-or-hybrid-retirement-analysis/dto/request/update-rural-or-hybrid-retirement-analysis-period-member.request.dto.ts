import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period-member.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementAnalysisPeriodMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RuralOrHybridRetirementAnalysisPeriodId)
  public ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto,
    { isArray: true },
  )
  public members: RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementAnalysisPeriodMemberRequestDto.name;
}
