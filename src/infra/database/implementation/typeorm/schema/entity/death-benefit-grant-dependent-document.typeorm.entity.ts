import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';

@Entity({ name: 'death_benefit_dependent_document' })
export class DeathBenefitGrantDependentDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitGrantDependentTypeormEntity,
    (entity) => entity.deathBenefitGrantDependentDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_dependent_id' })
  public deathBenefitGrantDependent?: DeathBenefitGrantDependentTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantDependentDocumentTypeormEntity.name;
}
