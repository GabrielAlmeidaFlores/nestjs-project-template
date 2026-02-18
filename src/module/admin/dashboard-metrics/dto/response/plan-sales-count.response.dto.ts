import { PlanSalesCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/plan-sales-count-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PlanSalesCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => PlanSalesCountItemResponseDto, {
    isArray: true,
  })
  public plans: PlanSalesCountItemResponseDto[];

  protected override readonly _type = PlanSalesCountResponseDto.name;
}
