import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity.props.interface';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodFamilyGroupMemberEntity extends BaseEntity<RuralTimelineAnalysisPeriodFamilyGroupMemberId> {
  @Description(
    'Nome completo do familiar que participou da atividade rural em regime de economia familiar.',
  )
  public readonly name: string;

  @Description('CPF do membro do grupo familiar envolvido na atividade rural.')
  public readonly federalDocument: string;

  @Description(
    'Grau de parentesco com o cliente: Cônjuge, Filho(a), Pai/Mãe ou Irmão/Irmã.',
  )
  public readonly kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @Description(
    'Indica se este familiar recebe ou recebeu benefício previdenciário rural do INSS.',
  )
  public readonly receivesRuralBenefit: boolean;

  @Description(
    'Número do benefício rural (NB) recebido pelo familiar, caso aplicável.',
  )
  public readonly benefitNumber: string;

  @Description(
    'Nome do arquivo CNIS do familiar para comprovação de vínculo rural.',
  )
  public readonly cnisDocument: string | null;

  @Description(
    'Período de atividade rural ao qual este membro do grupo familiar está associado.',
  )
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
