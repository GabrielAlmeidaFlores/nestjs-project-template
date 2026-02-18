import { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({
    description:
      'Ano de emissão ou referência do documento comprobatório (ex: 2015, 2020).',
    required: false,
  })
  public documentYear?: number;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentHolderTypeEnum, {
    description:
      'Tipo de titular do documento: client (cliente), family_group_member (membro do grupo familiar) ou third_party (terceiro).',
    required: false,
  })
  public documentHolderType?: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum;

  @RequestDtoBooleanProperty({
    description:
      'Indica se o documento pertence ao próprio cliente (true) ou a outra pessoa (false).',
    required: false,
  })
  public selfOwned?: boolean;

  @RequestDtoStringProperty({
    description:
      'Finalidade probatória do documento, descrevendo o que ele comprova sobre a atividade rural.',
    required: false,
  })
  public probatoryPurpose?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    description: 'Documento comprobatório enviado.',
    required: false,
  })
  public document?: Base64FileRequestDto;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentTypeEnum, {
    description:
      'Tipo/categoria do documento: CTPS, Documento Próprio, Documento Familiar ou Documento de Terceiro.',
    required: false,
  })
  public type?: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodDocumentRequestDto.name;
}
