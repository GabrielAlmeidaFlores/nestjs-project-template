import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';

@Entity({ name: 'death_benefit_rejection_legal_proceeding' })
export class DeathBenefitRejectionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'legal_proceeding_number', type: 'varchar', length: 255 })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionLegalProceeding,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionLegalProceedingTypeormEntity.name;
}
