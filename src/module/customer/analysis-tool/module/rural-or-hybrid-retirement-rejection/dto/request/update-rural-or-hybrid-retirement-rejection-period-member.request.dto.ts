import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-period-member.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementRejectionPeriodMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RuralOrHybridRetirementRejectionPeriodId)
  public ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto,
    { isArray: true },
  )
  public members: RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionPeriodMemberRequestDto.name;
}
