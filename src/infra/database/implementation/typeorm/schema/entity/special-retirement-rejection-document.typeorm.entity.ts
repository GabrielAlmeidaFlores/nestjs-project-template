import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';

@Entity({ name: 'special_retirement_rejection_document' })
export class SpecialRetirementRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public fileName: string | null;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public type: string | null;

  @ManyToOne(
    () => SpecialRetirementRejectionTypeormEntity,
    (entity) => entity.specialRetirementRejectionDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_id' })
  public specialRetirementRejection?: SpecialRetirementRejectionTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementRejectionDocumentTypeormEntity.name;
}
