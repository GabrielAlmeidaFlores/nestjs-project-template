import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';

@Entity({ name: 'retirement_planning_rpps_period_document' })
export class RetirementPlanningRppsPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document_type',
    type: 'simple-enum',
    enum: RetirementPlanningDocumentTypeEnum,
    nullable: false,
    default: RetirementPlanningDocumentTypeEnum.OTHER,
  })
  public documentType: RetirementPlanningDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => RetirementPlanningRppsPeriodTypeormEntity,
    (entity) => entity.periodDocuments,
    { nullable: false },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_period_id' })
  public retirementPlanningRppsPeriod?:
    | RetirementPlanningRppsPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsPeriodDocumentTypeormEntity.name;
}
