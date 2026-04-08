import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';

@Entity({ name: 'death_benefit_legal_proceeding' })
export class DeathBenefitLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'legal_proceeding_number', type: 'varchar', length: 255 })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitLegalProceeding,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefit?: DeathBenefitTypeormEntity | null;

  protected override readonly _type = DeathBenefitLegalProceedingTypeormEntity.name;
}
