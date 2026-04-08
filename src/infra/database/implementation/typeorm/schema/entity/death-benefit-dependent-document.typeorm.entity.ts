import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';

@Entity({ name: 'death_benefit_dependent_document' })
export class DeathBenefitDependentDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitDependentTypeormEntity,
    (entity) => entity.deathBenefitDependentDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_dependent_id' })
  public deathBenefitDependent?: DeathBenefitDependentTypeormEntity | null;

  protected override readonly _type = DeathBenefitDependentDocumentTypeormEntity.name;
}
