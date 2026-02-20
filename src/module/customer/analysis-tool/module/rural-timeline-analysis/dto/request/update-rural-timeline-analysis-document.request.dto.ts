import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RuralTimelineAnalysisDocumentTypeEnum, {
    description:
      'Tipo do documento: CNIS (Cadastro Nacional de Informações Sociais) contendo histórico de contribuições previdenciárias.',
    required: false,
  })
  public type?: RuralTimelineAnalysisDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    description: 'Documento CNIS enviado para análise.',
    required: false,
  })
  public document?: Base64FileRequestDto;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisDocumentRequestDto.name;
}
