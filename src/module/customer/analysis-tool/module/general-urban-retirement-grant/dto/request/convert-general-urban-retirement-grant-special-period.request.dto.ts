import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantSpecialPeriodId)
  public generalUrbanRetirementGrantSpecialPeriodId: GeneralUrbanRetirementGrantSpecialPeriodId;

  protected override readonly _type =
    DataConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto.name;
}

@RequestDto()
export class ConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto,
  )
  public json: DataConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto;

  protected override readonly _type =
    ConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto.name;
}
