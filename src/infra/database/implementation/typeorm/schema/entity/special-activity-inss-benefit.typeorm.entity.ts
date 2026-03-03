import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';

@Entity({ name: 'special_activity_inss_benefit' })
export class SpecialActivityInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => SpecialActivityTypeormEntity,
    (entity) => entity.specialActivityInssBenefit,
  )
  @JoinColumn({ name: 'special_activity_id' })
  public specialActivity: SpecialActivityTypeormEntity | undefined;

  protected override readonly _type =
    SpecialActivityInssBenefitTypeormEntity.name;
}
