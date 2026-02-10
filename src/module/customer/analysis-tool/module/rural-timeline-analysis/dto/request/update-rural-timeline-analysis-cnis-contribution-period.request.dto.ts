import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description:
      'Origem/fonte do vínculo empregatício registrado no CNIS (nome da empresa ou empregador).',
    required: false,
  })
  public employmentRelationshipSource?: string;

  @RequestDtoDateProperty({
    description:
      'Data de início do período de contribuição previdenciária registrado no CNIS.',
    required: false,
  })
  public startDate?: Date;

  @RequestDtoDateProperty({
    description:
      'Data de término do período de contribuição previdenciária registrado no CNIS.',
    required: false,
  })
  public endDate?: Date;

  @RequestDtoStringProperty({
    description:
      'Categoria/tipo de segurado da contribuição previdenciária (ex: empregado, contribuinte individual, segurado especial).',
    required: false,
  })
  public category?: string;

  @RequestDtoNumberProperty({
    description:
      'Período de carência em meses válido para benefícios previdenciários.',
    required: false,
  })
  public qualifyingPeriod?: number;

  @RequestDtoEnumProperty({
    description:
      'Status do período de contribuição: Válido (aceito pelo INSS) ou Pendente (aguardando análise/documentação).',
    enum: RuralTimelineAnalysisCnisContributionPeriodStatusEnum,
    required: false,
  })
  public status?: RuralTimelineAnalysisCnisContributionPeriodStatusEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @RequestDtoEnumProperty({
    description:
      'Intenção de ajuste: Incluir (adicionar período), Excluir (remover período) ou Provisório (aguardando decisão).',
    enum: ContributionAdjustmentIntentTypeEnum,
    required: false,
  })
  public contributionAdjustmentIntent?: ContributionAdjustmentIntentTypeEnum;

  @RequestDtoBooleanProperty({
    description:
      'Indica se há intenção de realizar suplementação externa de contribuições para completar o período.',
    required: false,
  })
  public externalSupplementationIntent?: boolean;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto.name;
}
