import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodEconomicAspectTypeEnum, {
    description:
      'Tipo de aspecto econômico verificado: CNPJ ativo, outras rendas, veículos rurais, maquinário agrícola ou empregados.',
    required: false,
  })
  public type?: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @RequestDtoStringProperty({
    description:
      'Descrição detalhada ou justificativa sobre este aspecto econômico da atividade rural.',
    required: false,
  })
  public content?: string;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto.name;
}
