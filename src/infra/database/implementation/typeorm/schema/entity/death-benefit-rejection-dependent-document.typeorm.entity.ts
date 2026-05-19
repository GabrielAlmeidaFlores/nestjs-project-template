import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';

@Entity({ name: 'death_benefit_rejection_dependent_document' })
export class DeathBenefitRejectionDependentDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitRejectionDependentTypeormEntity,
    (entity) => entity.deathBenefitRejectionDependentDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_dependent_id' })
  public deathBenefitRejectionDependent?: DeathBenefitRejectionDependentTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionDependentDocumentTypeormEntity.name;
}
