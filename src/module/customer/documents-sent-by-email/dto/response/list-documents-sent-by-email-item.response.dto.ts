import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListDocumentsSentByEmailItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    isArray: true,
    description: 'E-mails do destinatário',
  })
  public emails: string[];

  @ResponseDtoStringProperty({ description: 'Assunto do e-mail' })
  public subject: string;

  @ResponseDtoDateProperty({ description: 'Data de envio (createdAt)' })
  public sentAt: Date;

  @ResponseDtoStringProperty({ description: 'E-mail do remetente' })
  public sentBy: string;

  protected override readonly _type =
    ListDocumentsSentByEmailItemResponseDto.name;
}
