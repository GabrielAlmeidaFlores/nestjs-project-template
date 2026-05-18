import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';

@Entity({ name: 'disability_retirement_planning_grant_disability_period' })
export class DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'disability_degree',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
  })
  public disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @Column({
    name: 'disability_category',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantDisabilityCategoryEnum,
  })
  public disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;

  @Column({
    name: 'disability_description',
    type: 'longtext',
  })
  public disabilityDescription: string;

  @Column({
    name: 'daily_impact',
    type: 'longtext',
  })
  public dailyImpact: string;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'cid_ten_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public cidTenId: string | null;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantDisabilityPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  @OneToMany(
    () =>
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantDisabilityPeriod,
  )
  public disabilityRetirementPlanningGrantDisabilityPeriodDocument?:
    | DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity.name;
}
