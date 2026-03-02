import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';

@Entity({ name: 'disability_retirement_planning' })
export class DisabilityRetirementPlanningTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningTypeormEntity.name;

  @Column({ name: 'current_position', type: 'varchar', length: 255 })
  public currentPosition: string;

  @Column({
    name: 'federative_entity',
    type: 'simple-enum',
    enum: FederativeEntityEnum,
  })
  public federativeEntity: FederativeEntityEnum;

  @Column({
    name: 'state',
    type: 'simple-enum',
    enum: StateCodeEnum,
    nullable: true,
  })
  public state: StateCodeEnum | null;

  @Column({
    name: 'municipality',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public municipality: string | null;

  @Column({
    name: 'public_service_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public publicServiceStartDate: Date;

  @Column({
    name: 'career_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public careerStartDate: Date;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({ name: 'long_time_disability', type: 'boolean' })
  public longTimeDisability: boolean;

  @OneToOne(
    () => DisabilityRetirementPlanningResultTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningResult?: DisabilityRetirementPlanningResultTypeormEntity;

  @OneToMany(
    () => DisabilityRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningPeriod?: DisabilityRetirementPlanningPeriodTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningDocument?: DisabilityRetirementPlanningDocumentTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningInssBenefitTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningInssBenefit?: DisabilityRetirementPlanningInssBenefitTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningLegalProceedingTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningLegalProceeding?: DisabilityRetirementPlanningLegalProceedingTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningRemunerationTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public disabilityRetirementPlanningRemuneration?: DisabilityRetirementPlanningRemunerationTypeormEntity[];

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.disabilityRetirementPlanning,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity;
}
