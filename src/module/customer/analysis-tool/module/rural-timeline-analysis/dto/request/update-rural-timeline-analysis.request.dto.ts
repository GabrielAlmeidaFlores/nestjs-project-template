import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description:
      'Análise completa gerada pela IA sobre a linha do tempo rural do cliente, incluindo avaliação detalhada dos períodos de atividade rural e urbana.',
    required: false,
  })
  public ruralTimelineCompleteAnalysis?: string;

  @RequestDtoStringProperty({
    description:
      'Análise simplificada gerada pela IA sobre a linha do tempo rural do cliente, com resumo objetivo dos períodos de atividade.',
    required: false,
  })
  public ruralTimelineSimplifiedAnalysis?: string;

  @RequestDtoStringProperty({
    description:
      'Análise detalhada dos documentos comprobatórios apresentados para cada período da linha do tempo rural.',
    required: false,
  })
  public ruralTimelinePeriodDocumentAnalysis?: string;

  @RequestDtoEnumProperty(RuralTimelineAnalysisWorkRegimeEnum, {
    description:
      'Regime de trabalho identificado: se o cliente trabalhou somente em atividades rurais ou de forma híbrida (rural e urbana).',
    required: false,
  })
  public workRegime?: RuralTimelineAnalysisWorkRegimeEnum;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisRequestDto.name;
}
