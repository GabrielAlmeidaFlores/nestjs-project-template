import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity.props.interface';
import { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisLegalProceedingEntity extends BaseEntity<RuralTimelineAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado à análise de linha do tempo rural.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'ID da análise de linha do tempo rural associada ao processo judicial.',
  )
  public readonly ruralTimelineAnalysisId: RuralTimelineAnalysisId;

  protected readonly _type = RuralTimelineAnalysisLegalProceedingEntity.name;

  public constructor(
    props: RuralTimelineAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.ruralTimelineAnalysisId = props.ruralTimelineAnalysisId;
  }
}
