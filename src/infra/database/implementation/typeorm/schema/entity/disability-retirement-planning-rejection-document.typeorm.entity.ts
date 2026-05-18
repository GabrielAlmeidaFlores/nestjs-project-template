import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';

@Entity({ name: 'disability_retirement_planning_rejection_document' })
export class DisabilityRetirementPlanningRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionDocumentTypeEnum,
  })
  public type: DisabilityRetirementPlanningRejectionDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_id' })
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionDocumentTypeormEntity.name;
}
