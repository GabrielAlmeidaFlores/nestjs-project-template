import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity.props.interface';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisInssBenefitEntity extends BaseEntity<RuralTimelineAnalysisInssBenefitId> {
  @Description(
    'Número do benefício INSS associado à análise de linha do tempo rural.',
  )
  public readonly inssBenefitNumber: string;

  @Description('Análise de linha do tempo rural associada ao benefício INSS.')
  public readonly ruralTimelineAnalysis: RuralTimelineAnalysisEntity;

  protected readonly _type = RuralTimelineAnalysisInssBenefitEntity.name;

  public constructor(
    props: RuralTimelineAnalysisInssBenefitEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.ruralTimelineAnalysis = props.ruralTimelineAnalysis;
  }
}
