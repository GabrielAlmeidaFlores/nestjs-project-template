import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';

@Entity({ name: 'death_benefit_period_document' })
export class DeathBenefitGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DeathBenefitGrantPeriodTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_period_id' })
  public deathBenefitGrantPeriod?: DeathBenefitGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantPeriodDocumentTypeormEntity.name;
}
