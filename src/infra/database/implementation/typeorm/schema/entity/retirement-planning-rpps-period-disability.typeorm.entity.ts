import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten-typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

@Entity({ name: 'retirement_planning_rpps_period_disability' })
export class RetirementPlanningRppsPeriodDisabilityTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityTimeTypeEnum,
    nullable: false,
  })
  public type: RetirementPlanningDisabilityTimeTypeEnum;

  @Column({
    name: 'degree',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityDegreeEnum,
    nullable: false,
  })
  public degree: RetirementPlanningDisabilityDegreeEnum;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: false,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: false,
  })
  public endDate: Date;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityCategoryEnum,
    nullable: false,
  })
  public category: RetirementPlanningDisabilityCategoryEnum;

  @Column({
    name: 'daily_impact',
    type: 'text',
    nullable: false,
  })
  public dailyImpact: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  public description: string;

  @ManyToOne(() => CidTenTypeormEntity)
  @JoinColumn({ name: 'cid_id' })
  public cid?: CidTenTypeormEntity | undefined;

  @OneToMany(
    () => RetirementPlanningRppsPeriodDocumentTypeormEntity,
    (entity) => entity.retirementPlanningRppsPeriodDisability,
  )
  public disabilityDocuments?:
    | RetirementPlanningRppsPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => RetirementPlanningRppsPeriodTypeormEntity,
    (entity) => entity.disabilityPeriod,
  )
  @JoinColumn({ name: 'retirement_planning_rpps_period_id' })
  public retirementPlanningRppsPeriod?:
    | RetirementPlanningRppsPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsPeriodDisabilityTypeormEntity.name;
}
