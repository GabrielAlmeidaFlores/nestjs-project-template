import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SystemActivityItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public title: string;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoStringProperty({ required: false })
  public organizationMemberId?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public collaboratorName?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public collaboratorEmail?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public analysisToolRecordId?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public analysisCode?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public analysisToolClientId?: string | undefined;

  @ResponseDtoStringProperty({ required: false })
  public clientName?: string | undefined;

  protected override readonly _type = SystemActivityItemResponseDto.name;
}
