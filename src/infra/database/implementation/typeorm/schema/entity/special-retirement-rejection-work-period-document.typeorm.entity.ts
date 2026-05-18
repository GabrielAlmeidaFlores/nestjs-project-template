import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';

@Entity({ name: 'special_retirement_rejection_work_period_document' })
export class SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
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
    () => SpecialRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_work_period_id' })
  public specialRetirementRejectionWorkPeriod?: SpecialRetirementRejectionWorkPeriodTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity.name;
}
