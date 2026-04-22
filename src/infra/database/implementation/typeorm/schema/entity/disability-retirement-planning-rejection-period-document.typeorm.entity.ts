import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_rejection_period_document' })
export class DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_period_id' })
  public disabilityRetirementPlanningRejectionPeriod?: DisabilityRetirementPlanningRejectionPeriodTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity.name;
}
