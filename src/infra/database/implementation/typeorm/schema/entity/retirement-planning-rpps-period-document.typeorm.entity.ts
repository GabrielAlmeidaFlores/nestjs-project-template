import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
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
    type: 'longtext',
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    (entity) => entity.specialTimeDocuments,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_period_special_time_id' })
  public retirementPlanningRppsPeriodSpecialTime?:
    | RetirementPlanningRppsPeriodSpecialTimeTypeormEntity
    | undefined;

  @ManyToOne(
    () => RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    (entity) => entity.disabilityDocuments,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_period_disability_id' })
  public retirementPlanningRppsPeriodDisability?:
    | RetirementPlanningRppsPeriodDisabilityTypeormEntity
    | undefined;

  @ManyToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.documents,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_id' })
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsPeriodDocumentTypeormEntity.name;
}
