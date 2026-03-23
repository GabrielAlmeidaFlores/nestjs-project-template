import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SendDocumentsByEmailResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'ID do histórico de e-mail enviado',
  })
  public customerEmailSentId: string;

  @ResponseDtoStringProperty({
    isArray: true,
    description: 'Para quais e-mails foi enviado',
  })
  public sentTo: string[];

  @ResponseDtoStringProperty({ description: 'Assunto do e-mail' })
  public subject: string;

  protected override readonly _type = SendDocumentsByEmailResponseDto.name;
}
