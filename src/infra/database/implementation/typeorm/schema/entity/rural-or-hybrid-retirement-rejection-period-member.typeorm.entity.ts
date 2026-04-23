import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/enum/rural-or-hybrid-retirement-rejection-kinship.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_period_member' })
export class RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionKinshipEnum,
    nullable: true,
  })
  public kinship: RuralOrHybridRetirementRejectionKinshipEnum | null;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public federalDocument: string | null;

  @Column({
    name: 'has_received_rural_benefit',
    type: 'boolean',
    nullable: true,
  })
  public hasReceivedRuralBenefit: boolean | null;

  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public benefitNumber: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionPeriodMember,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_period_id' })
  public ruralOrHybridRetirementRejectionPeriod?:
    | RuralOrHybridRetirementRejectionPeriodTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionPeriodMember,
  )
  public ruralOrHybridRetirementRejectionPeriodMemberDocument?:
    | RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity.name;
}
