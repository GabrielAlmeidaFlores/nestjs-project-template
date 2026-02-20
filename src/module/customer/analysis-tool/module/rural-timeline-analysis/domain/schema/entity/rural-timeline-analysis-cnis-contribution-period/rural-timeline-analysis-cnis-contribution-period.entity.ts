import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodId> {
  @Description(
    'Linha do tempo rural à qual este período de contribuição CNIS pertence.',
  )
  public readonly ruralTimelineId: RuralTimelineAnalysisId | null;

  @Description(
    'Origem/fonte do vínculo empregatício registrado no CNIS (nome da empresa ou empregador).',
  )
  public readonly employmentRelationshipSource: string | null;

  @Description(
    'Data de início do período de contribuição previdenciária registrado no CNIS.',
  )
  public readonly startDate: Date | null;

  @Description(
    'Data de término do período de contribuição previdenciária registrado no CNIS.',
  )
  public readonly endDate: Date | null;

  @Description(
    'Categoria/tipo de segurado da contribuição previdenciária (ex: empregado, contribuinte individual, segurado especial).',
  )
  public readonly category: string | null;

  @Description(
    'Período de carência em meses válido para benefícios previdenciários.',
  )
  public readonly qualifyingPeriod: number | null;

  @Description(
    'Status do período de contribuição: Válido (aceito pelo INSS) ou Pendente (aguardando análise/documentação).',
  )
  public readonly status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null;

  @Description(
    'Valor médio mensal das contribuições previdenciárias realizadas neste período.',
  )
  public readonly averageContributionAmount: DecimalValue | null;

  @Description(
    'Intenção de ajuste: Incluir (adicionar período), Excluir (remover período) ou Provisório (aguardando decisão).',
  )
  public readonly contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @Description(
    'Indica se há intenção de realizar suplementação externa de contribuições para completar o período.',
  )
  public readonly externalSupplementationIntent: boolean;

  @Description(
    'Referência do documento CNIS associado a este período de contribuição.',
  )
  public readonly cnisDocument: string | null;

  @Description(
    'Análise de impacto gerada pela IA sobre o período de contribuição CNIS, considerando contribuições em atraso, datas de saída pendentes e outros fatores.',
  )
  public readonly impactAnalysis: string | null;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodId, props);

    this.ruralTimelineId = props.ruralTimelineId ?? null;
    this.employmentRelationshipSource =
      props.employmentRelationshipSource ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.qualifyingPeriod = props.qualifyingPeriod ?? null;
    this.status = props.status ?? null;
    this.averageContributionAmount = props.averageContributionAmount ?? null;
    this.contributionAdjustmentIntent = props.contributionAdjustmentIntent;
    this.externalSupplementationIntent = props.externalSupplementationIntent;
    this.cnisDocument = props.cnisDocument ?? null;
    this.impactAnalysis = props.impactAnalysis ?? null;
  }
}
