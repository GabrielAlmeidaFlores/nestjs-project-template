import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';

@Entity({ name: 'death_benefit_period_document' })
export class DeathBenefitPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitPeriodTypeormEntity,
    (entity) => entity.deathBenefitPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_period_id' })
  public deathBenefitPeriod?: DeathBenefitPeriodTypeormEntity | null;

  protected override readonly _type = DeathBenefitPeriodDocumentTypeormEntity.name;
}
