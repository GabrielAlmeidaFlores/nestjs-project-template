import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/enum/rural-or-hybrid-retirement-rejection-work-period-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_work_period_document' })
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionWorkPeriodDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_work_period_id' })
  public ruralOrHybridRetirementRejectionWorkPeriod?:
    | RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity.name;
}
