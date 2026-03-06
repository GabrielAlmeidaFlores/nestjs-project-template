import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';

@Entity({ name: 'disability_retirement_planning_document' })
export class DisabilityRetirementPlanningDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningDocumentTypeEnum,
  })
  public type: DisabilityRetirementPlanningDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningDocument,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;

  protected override readonly _type =
    DisabilityRetirementPlanningDocumentTypeormEntity.name;
}
