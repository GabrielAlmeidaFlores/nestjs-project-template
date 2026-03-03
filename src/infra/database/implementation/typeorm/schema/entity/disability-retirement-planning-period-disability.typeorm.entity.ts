import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

@Entity({ name: 'disability_retirement_planning_period_disability' })
export class DisabilityRetirementPlanningPeriodDisabilityTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate: Date | null;

  @Column({
    name: 'disability_degree',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityDegreeEnum,
  })
  public disabilityDegree: RetirementPlanningDisabilityDegreeEnum;

  @Column({
    name: 'disability_category',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
  })
  public disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;

  @Column({
    name: 'disability_type',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityTimeTypeEnum,
  })
  public disabilityType: RetirementPlanningDisabilityTimeTypeEnum;

  @Column({ name: 'disability_description', type: 'text' })
  public disabilityDescription: string;

  @Column({ name: 'activity_impact', type: 'text' })
  public activityImpact: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodDisability,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_id' })
  public disabilityRetirementPlanningPeriod?: DisabilityRetirementPlanningPeriodTypeormEntity;

  @ManyToOne(() => CidTenTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'cid_ten_id' })
  public cidTen?: CidTenTypeormEntity;

  @OneToMany(
    () => DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodDisability,
  )
  public disabilityRetirementPlanningPeriodDisabilityDocument?: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity[];

  protected override readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityTypeormEntity.name;
}
