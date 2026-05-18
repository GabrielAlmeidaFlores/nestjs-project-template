import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_grant_previous_benefits' })
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 100,
  })
  public benefitNumber: string;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPreviousBenefits,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_period_id' })
  public temporaryDisabilityBenefitsGrantPeriod?: TemporaryDisabilityBenefitsGrantPeriodTypeormEntity | null;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPreviousBenefits,
  )
  public temporaryDisabilityBenefitsGrantPreviousBenefitsDocument?:
    | TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity.name;
}
