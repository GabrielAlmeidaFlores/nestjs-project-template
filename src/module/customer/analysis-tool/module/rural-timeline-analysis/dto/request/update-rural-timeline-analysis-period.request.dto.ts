import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description:
      'Data de início do período de atividade rural (formato: DD/MM/AAAA).',
    required: false,
  })
  public startDate?: Date;

  @RequestDtoDateProperty({
    description:
      'Data de término do período de atividade rural (formato: DD/MM/AAAA).',
    required: false,
  })
  public endDate?: Date;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodWorkerTypeEnum, {
    description:
      'Tipo de trabalhador rural: Segurado Especial Rural, Pescador Artesanal, Seringueiro/Extrativista ou Empregado Rural.',
    required: false,
  })
  public workerType?: RuralTimelineAnalysisPeriodWorkerTypeEnum;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodWorkRegimeTypeEnum, {
    description:
      'Regime de trabalho rural: Individual (trabalho próprio) ou Economia Familiar (trabalho em grupo familiar).',
    required: false,
  })
  public workRegimeType?: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum;

  @RequestDtoEnumProperty(ProductionDestinationEnum, {
    description:
      'Destino da produção rural: Subsistência (consumo próprio), Comercialização (venda) ou Ambos.',
    required: false,
  })
  public productionDestination?: ProductionDestinationEnum;

  @RequestDtoStringProperty({
    description:
      'Análise gerada pela IA sobre os documentos comprobatórios apresentados para este período específico.',
    required: false,
  })
  public documentAnalysis?: string;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodRequestDto.name;
}
