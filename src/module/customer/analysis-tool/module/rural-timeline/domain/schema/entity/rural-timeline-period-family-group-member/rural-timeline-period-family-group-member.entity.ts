import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelinePeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/enum/rural-timeline-period-family-group-member-kinship-type.enum';
import { RuralTimelinePeriodFamilyGroupMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/rural-timeline-period-family-group-member.entity.props.interface';
import { RuralTimelinePeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/value-object/rural-timeline-period-family-group-member-id/rural-timeline-period-family-group-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';

export class RuralTimelinePeriodFamilyGroupMemberEntity extends BaseEntity<RuralTimelinePeriodFamilyGroupMemberId> {
  @Description('Nome do membro do grupo familiar.')
  public readonly name: string;

  @Description('Documento federal (CPF).')
  public readonly federalDocument: string;

  @Description('Tipo de parentesco.')
  public readonly kinship: RuralTimelinePeriodFamilyGroupMemberKinshipTypeEnum;

  @Description('Recebe benefício rural.')
  public readonly receivesRuralBenefit: boolean;

  @Description('Número do benefício.')
  public readonly benefitNumber: string;

  @Description('Documento CNIS.')
  public readonly cnisDocument: string | null;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelinePeriodId;

  protected readonly _type = RuralTimelinePeriodFamilyGroupMemberEntity.name;

  public constructor(
    props: RuralTimelinePeriodFamilyGroupMemberEntityPropsInterface,
  ) {
    super(RuralTimelinePeriodFamilyGroupMemberId, props);

    this.name = props.name;
    this.federalDocument = props.federalDocument;
    this.kinship = props.kinship;
    this.receivesRuralBenefit = props.receivesRuralBenefit;
    this.benefitNumber = props.benefitNumber;
    this.cnisDocument = props.cnisDocument ?? null;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
