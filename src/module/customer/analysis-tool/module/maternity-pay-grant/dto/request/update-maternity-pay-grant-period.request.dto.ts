import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { MaternityPayGrantPeriodItemWithDocumentsRequestDto } from './create-maternity-pay-grant-period.request.dto';

@RequestDto()
export class UpdateMaternityPayGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => MaternityPayGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: MaternityPayGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateMaternityPayGrantPeriodRequestDto.name;
}
