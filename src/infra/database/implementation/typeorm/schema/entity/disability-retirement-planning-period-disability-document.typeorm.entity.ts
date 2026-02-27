import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_period_disability_document' })
export class DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity.name;

  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodDisabilityDocument,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_disability_id' })
  public disabilityRetirementPlanningPeriodDisability?: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity;
}
