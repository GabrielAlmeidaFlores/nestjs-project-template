import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period.typeorm.entity';

@Entity({
  name: 'special_retirement_rejection_work_special_period_legal_framework',
})
export class SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public code: string | null;

  @Column({
    name: 'description',
    type: 'longtext',
    nullable: true,
  })
  public description: string | null;

  @ManyToOne(
    () => SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity,
    (entity) =>
      entity.specialRetirementRejectionWorkSpecialPeriodLegalFramework,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_work_special_period_id' })
  public specialRetirementRejectionWorkSpecialPeriod?: SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity.name;
}
