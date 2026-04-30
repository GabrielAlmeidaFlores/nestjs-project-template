import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_terminated_inss_benefit' })
export class TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'temporary_disability_benefits_terminated_id' })
  public temporaryDisabilityBenefitsTerminated?: TemporaryDisabilityBenefitsTerminatedTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity.name;
}
