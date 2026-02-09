import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';

@Entity({ name: 'rural_timeline_period_family_group_member' })
export class RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  public name: string;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 20,
  })
  public federalDocument: string;

  @Column({
    name: 'kinship',
    type: 'varchar',
    length: 50,
  })
  public kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @Column({
    name: 'receives_rural_benefit',
    type: 'boolean',
  })
  public receivesRuralBenefit: boolean;

  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public benefitNumber: string | null;

  @Column({
    name: 'cnis_document',
    type: 'text',
    nullable: true,
  })
  public cnisDocument?: string | null;

  @ManyToOne(
    () => RuralTimelineAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodFamilyGroupMember,
  )
  @JoinColumn({ name: 'rural_timeline_period_id' })
  public ruralTimelinePeriod?:
    | RuralTimelineAnalysisPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity.name;
}
