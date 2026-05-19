import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/enum/rural-or-hybrid-retirement-analysis-kinship.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_period_member' })
export class RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisKinshipEnum,
    nullable: true,
  })
  public kinship: RuralOrHybridRetirementAnalysisKinshipEnum | null;

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
    () => RuralOrHybridRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriodMember,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_period_id' })
  public ruralOrHybridRetirementAnalysisPeriod?:
    | RuralOrHybridRetirementAnalysisPeriodTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriodMember,
  )
  public ruralOrHybridRetirementAnalysisPeriodMemberDocument?:
    | RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity.name;
}
