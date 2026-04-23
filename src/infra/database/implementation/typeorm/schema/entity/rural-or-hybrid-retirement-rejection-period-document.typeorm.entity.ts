import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/enum/rural-or-hybrid-retirement-rejection-period-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_period_document' })
export class RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionPeriodDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_period_id' })
  public ruralOrHybridRetirementRejectionPeriod?:
    | RuralOrHybridRetirementRejectionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity.name;
}
