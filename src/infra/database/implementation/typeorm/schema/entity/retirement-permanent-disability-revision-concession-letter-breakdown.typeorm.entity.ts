import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';

@Entity({ name: 'retirement_per_dis_rev_concession_letter_breakdown' })
export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'competence', type: 'varchar', length: 20 })
  public competence: string;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  public amount: string;

  @Column({ name: 'reason_not_considered', type: 'varchar', length: 500 })
  public reasonNotConsidered: string;

  @Column({ name: 'action', type: 'varchar', length: 255 })
  public action: string;

  @ManyToOne(() => RetirementPermanentDisabilityRevisionTypeormEntity)
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision?:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity.name;
}
