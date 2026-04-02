import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class EmailTemplateItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ description: 'ID do template' })
  public id: string;

  @ResponseDtoStringProperty({ description: 'Nome do template' })
  public nome: string;

  @ResponseDtoStringProperty({ description: 'Descrição do template' })
  public descricao: string;

  @ResponseDtoStringProperty({ description: 'Conteúdo HTML do template' })
  public htmlContent: string;

  protected override readonly _type = EmailTemplateItemResponseDto.name;
}
