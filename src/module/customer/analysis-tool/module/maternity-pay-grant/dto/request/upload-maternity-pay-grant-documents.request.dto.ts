import { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UploadMaternityPayGrantDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public cnis: Base64FileRequestDto;

  @RequestDtoEnumProperty(MaternityPayGrantTriggeringEventEnum)
  public triggeringEvent: MaternityPayGrantTriggeringEventEnum;

  @RequestDtoDateProperty()
  public triggeringEventDate: Date;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { isArray: true })
  public documents: Base64FileRequestDto[];

  @RequestDtoBooleanProperty()
  public wasUnemployedAtEventDate: boolean;

  @RequestDtoBooleanProperty()
  public wasRuralInsuredAtEventDate: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public ruralDocuments?: Base64FileRequestDto[];

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public ruralPeriodDocumentDescription?: string;

  protected override readonly _type =
    UploadMaternityPayGrantDocumentsRequestDto.name;
}
