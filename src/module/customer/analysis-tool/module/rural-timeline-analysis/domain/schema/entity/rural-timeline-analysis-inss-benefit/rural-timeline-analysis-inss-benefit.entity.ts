import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity.props.interface';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisInssBenefitEntity extends BaseEntity<RuralTimelineAnalysisInssBenefitId> {
  @Description(
    'Número do benefício INSS associado à análise de linha do tempo rural.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'ID da análise de linha do tempo rural associada ao benefício INSS.',
  )
  public readonly ruralTimelineAnalysisId: RuralTimelineAnalysisId;

  protected readonly _type = RuralTimelineAnalysisInssBenefitEntity.name;

  public constructor(
    props: RuralTimelineAnalysisInssBenefitEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.ruralTimelineAnalysisId = props.ruralTimelineAnalysisId;
  }
}
