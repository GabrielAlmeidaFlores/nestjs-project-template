import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';

@Entity({ name: 'death_benefit_rejection_period_document' })
export class DeathBenefitRejectionPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitRejectionPeriodTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_period_id' })
  public deathBenefitRejectionPeriod?: DeathBenefitRejectionPeriodTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionPeriodDocumentTypeormEntity.name;
}
