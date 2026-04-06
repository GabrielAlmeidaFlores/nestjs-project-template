import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateEmailTemplateRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ example: 'Template padrão' })
  public nome: string;

  @RequestDtoStringProperty({ example: 'Descrição do template' })
  public descricao: string;

  @RequestDtoStringProperty({
    example: '<p>Olá! Este é o seu conteúdo.</p>',
  })
  public htmlContent: string;

  protected override readonly _type = UpdateEmailTemplateRequestDto.name;
}
