import { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetLegalPleadingHistoryItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoEnumProperty(LegalPleadingHistoryTitleEnum)
  public title: LegalPleadingHistoryTitleEnum;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type =
    GetLegalPleadingHistoryItemResponseDto.name;
}

@ResponseDto()
export class ListLegalPleadingHistoryResponseDto extends ListDataResponseDto<GetLegalPleadingHistoryItemResponseDto> {
  @ResponseDtoObjectProperty(() => GetLegalPleadingHistoryItemResponseDto, {
    isArray: true,
  })
  public override resource: GetLegalPleadingHistoryItemResponseDto[];

  protected override readonly _type = ListLegalPleadingHistoryResponseDto.name;
}
