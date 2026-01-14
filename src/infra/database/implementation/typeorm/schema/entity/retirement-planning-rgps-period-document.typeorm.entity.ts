import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_period_document' })
export class RetirementPlanningRgpsPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(() => RetirementPlanningRgpsPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'retirement_planning_rgps_period_id' })
  public retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodTypeormEntity | null;

  protected override readonly _type =
    RetirementPlanningRgpsPeriodDocumentTypeormEntity.name;
}
