import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/enum/disability-retirement-planning-grant-disability-period-document-type.enum';

@Entity({
  name: 'disability_retirement_planning_grant_disability_period_document',
})
export class DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
  })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum,
  })
  public type: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    (entity) =>
      entity.disabilityRetirementPlanningGrantDisabilityPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({
    name: 'disability_retirement_planning_grant_disability_period_id',
  })
  public disabilityRetirementPlanningGrantDisabilityPeriod?: DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity.name;
}
