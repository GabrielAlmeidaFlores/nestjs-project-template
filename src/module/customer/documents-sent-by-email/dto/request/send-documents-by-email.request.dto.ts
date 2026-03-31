import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SendDocumentsByEmailRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ isArray: true, example: ['email@dominio.com'] })
  public emails: string[];

  @RequestDtoStringProperty({ example: 'Assunto do email' })
  public subject: string;

  @RequestDtoStringProperty({ example: '<p>corpo do email</p>' })
  public htmlContent: string;

  @RequestDtoBooleanProperty({ example: false })
  public isSimplified: boolean;

  @RequestDtoStringProperty({
    isArray: true,
    example: ['aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'],
  })
  public analysisToolRecordIds: string[];

  protected override readonly _type = SendDocumentsByEmailRequestDto.name;
}
