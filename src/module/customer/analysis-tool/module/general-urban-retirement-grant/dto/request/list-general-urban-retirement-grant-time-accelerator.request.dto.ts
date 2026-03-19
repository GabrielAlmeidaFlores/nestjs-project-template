import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId, {
    required: true,
  })
  public readonly generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  protected override readonly _type =
    ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto.name;
}
