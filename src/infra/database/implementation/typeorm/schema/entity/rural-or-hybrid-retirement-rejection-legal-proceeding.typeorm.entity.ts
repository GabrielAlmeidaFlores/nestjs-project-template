import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_legal_proceeding' })
export class RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public legalProceedingNumber: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionLegalProceeding,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_id' })
  public ruralOrHybridRetirementRejection?:
    | RuralOrHybridRetirementRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity.name;
}
