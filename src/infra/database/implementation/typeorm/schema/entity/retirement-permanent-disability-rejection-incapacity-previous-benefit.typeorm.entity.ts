import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'retirement_permanent_disability_rejection_incapacity_prev_ben',
})
export class RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'benefit_number', type: 'varchar', length: 100 })
  public benefitNumber: string;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public startDate: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate: Date | null;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRejectionIncapacityPreviousBenefit,
  )
  public retirementPermanentDisabilityRejectionIncapacity?: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity.name;
}
