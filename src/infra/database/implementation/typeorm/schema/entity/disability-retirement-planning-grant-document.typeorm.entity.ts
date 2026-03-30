import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DisabilityRetirementPlanningGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/enum/disability-retirement-planning-grant-document-type.enum';

@Entity({ name: 'disability_retirement_planning_grant_document' })
export class DisabilityRetirementPlanningGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
  })
  public document: string;

  @Column({
    name: 'type',

    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantDocumentTypeEnum,
  })
  public type: DisabilityRetirementPlanningGrantDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantDocumentTypeormEntity.name;
}
