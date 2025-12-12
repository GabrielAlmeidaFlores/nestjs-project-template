import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';

@Entity('retirement_planning_rpps')
export class RetirementPlanningRppsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'ctc_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public ctcDocument: string | null;

  @Column({
    name: 'career_start_date',
    type: 'date',
    nullable: false,
  })
  public careerStartDate: Date;

  @Column({
    name: 'public_service_start_date',
    type: 'date',
    nullable: false,
  })
  public publicServiceStartDate: Date;

  @OneToOne(
    () => RetirementPlanningRppsResultTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  @JoinColumn({ name: 'retirement_planning_rpps_result_id' })
  public retirementPlanningRppsResult?:
    | RetirementPlanningRppsResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => RetirementPlanningRppsRemunerationTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public remunerations?:
    | RetirementPlanningRppsRemunerationTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPlanningRppsPeriodTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public periods?: RetirementPlanningRppsPeriodTypeormEntity[] | undefined;

  protected override readonly _type = RetirementPlanningRppsTypeormEntity.name;
}
