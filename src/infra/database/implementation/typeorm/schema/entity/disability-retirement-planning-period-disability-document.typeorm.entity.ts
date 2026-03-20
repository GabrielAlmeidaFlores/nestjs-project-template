import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/enum/disability-retirement-planning-period-disability-document-type.enum';

@Entity({ name: 'disability_retirement_planning_period_disability_document' })
export class DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  public type: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodDisabilityDocument,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_disability_id' })
  public disabilityRetirementPlanningPeriodDisability?: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity;

  protected override readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity.name;
}
