import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';

@Entity({ name: 'special_retirement_rejection_legal_proceeding' })
export class SpecialRetirementRejectionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public number: string | null;

  @ManyToOne(
    () => SpecialRetirementRejectionTypeormEntity,
    (entity) => entity.specialRetirementRejectionLegalProceeding,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_id' })
  public specialRetirementRejection?: SpecialRetirementRejectionTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementRejectionLegalProceedingTypeormEntity.name;
}
