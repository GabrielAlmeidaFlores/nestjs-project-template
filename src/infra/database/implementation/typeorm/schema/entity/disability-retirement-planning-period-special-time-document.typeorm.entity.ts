import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/enum/disability-retirement-planning-period-special-time-document-type.enum';

@Entity({ name: 'disability_retirement_planning_period_special_time_document' })
export class DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  public type: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodSpecialTimeDocument,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_special_time_id' })
  public disabilityRetirementPlanningPeriodSpecialTime?: DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity;

  protected override readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity.name;
}
