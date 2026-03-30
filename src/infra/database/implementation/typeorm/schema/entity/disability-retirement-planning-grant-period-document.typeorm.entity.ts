import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_grant_period_document' })
export class DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
  })
  public document: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_period_id' })
  public disabilityRetirementPlanningGrantPeriod?: DisabilityRetirementPlanningGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity.name;
}
