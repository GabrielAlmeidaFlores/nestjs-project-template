import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { RetirementPlanningRppsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';

@Entity('retirement_planning_rpps')
export class RetirementPlanningRppsTypeormEntity extends BaseTypeormEntity {
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
    () => RetirementPlanningRppsInssBenefitTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public retirementPlanningRppsInssBenefit?:
    | RetirementPlanningRppsInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPlanningRppsLegalProceedingTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public retirementPlanningRppsLegalProceeding?:
    | RetirementPlanningRppsLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPlanningRppsPeriodTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public periods?: RetirementPlanningRppsPeriodTypeormEntity[] | undefined;

  @OneToMany(
    () => RetirementPlanningRppsPeriodDocumentTypeormEntity,
    (entity) => entity.retirementPlanningRpps,
  )
  public documents?:
    | RetirementPlanningRppsPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type = RetirementPlanningRppsTypeormEntity.name;
}
