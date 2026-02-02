import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';

@Entity({ name: 'special_activity_legal_proceeding' })
export class SpecialActivityLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => SpecialActivityTypeormEntity,
    (entity) => entity.specialActivityLegalProceeding,
  )
  @JoinColumn({ name: 'special_activity_id' })
  public specialActivity: SpecialActivityTypeormEntity | undefined;

  protected override readonly _type =
    SpecialActivityLegalProceedingTypeormEntity.name;
}
