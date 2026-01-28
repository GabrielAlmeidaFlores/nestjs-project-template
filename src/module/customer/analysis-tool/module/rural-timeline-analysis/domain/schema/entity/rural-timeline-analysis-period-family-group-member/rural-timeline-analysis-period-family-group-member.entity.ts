import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity.props.interface';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodFamilyGroupMemberEntity extends BaseEntity<RuralTimelineAnalysisPeriodFamilyGroupMemberId> {
  @Description('Nome do membro do grupo familiar.')
  public readonly name: string;

  @Description('Documento federal (CPF).')
  public readonly federalDocument: string;

  @Description('Tipo de parentesco.')
  public readonly kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @Description('Recebe benefício rural.')
  public readonly receivesRuralBenefit: boolean;

  @Description('Número do benefício.')
  public readonly benefitNumber: string;

  @Description('Documento CNIS.')
  public readonly cnisDocument: string | null;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelineAnalysisPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodFamilyGroupMemberEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodFamilyGroupMemberId, props);

    this.name = props.name;
    this.federalDocument = props.federalDocument;
    this.kinship = props.kinship;
    this.receivesRuralBenefit = props.receivesRuralBenefit;
    this.benefitNumber = props.benefitNumber;
    this.cnisDocument = props.cnisDocument ?? null;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
