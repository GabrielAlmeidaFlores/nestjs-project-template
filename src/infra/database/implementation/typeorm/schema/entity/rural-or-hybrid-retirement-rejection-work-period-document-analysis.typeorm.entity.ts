import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';

@Entity({
  name: 'rural_or_hybrid_retirement_rejection_work_period_document_analysis',
})
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public documentType: string | null;

  @Column({ name: 'own_name', type: 'varchar', length: 255, nullable: true })
  public ownName: string | null;

  @Column({ name: 'document_year', type: 'int', nullable: true })
  public documentYear: number | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
  public technicalNote: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity,
    (entity) =>
      entity.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_work_period_id' })
  public ruralOrHybridRetirementRejectionWorkPeriod?:
    | RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity.name;
}
