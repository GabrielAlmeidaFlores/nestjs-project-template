import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
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

  @RequestDtoEnumProperty(
    RuralTimelineAnalysisCnisContributionPeriodStatusEnum,
    {
      description:
        'Status do período de contribuição: Válido (aceito pelo INSS) ou Pendente (aguardando análise/documentação).',
      required: false,
    },
  )
  public status?: RuralTimelineAnalysisCnisContributionPeriodStatusEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @RequestDtoEnumProperty(ContributionAdjustmentIntentTypeEnum, {
    description:
      'Intenção de ajuste: Incluir (adicionar período), Excluir (remover período) ou Provisório (aguardando decisão).',
    required: false,
  })
  public contributionAdjustmentIntent?: ContributionAdjustmentIntentTypeEnum;

  @RequestDtoBooleanProperty({
    description:
      'Indica se há intenção de realizar suplementação externa de contribuições para completar o período.',
    required: false,
  })
  public externalSupplementationIntent?: boolean;

  @RequestDtoBooleanProperty({
    description:
      'Indica se este período deve ser considerado nos cálculos de aposentadoria. Se falso, o período é ignorado.',
    required: false,
  })
  public shouldConsiderPeriod?: boolean;

  @RequestDtoBooleanProperty({
    description:
      'Se verdadeiro, a data da última remuneração deste período será automaticamente usada como data de saída.',
    required: false,
  })
  public shouldConsiderLastRemunerationAsExitDate?: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false })
  public cnisDocument?: Base64FileRequestDto;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto.name;
}
